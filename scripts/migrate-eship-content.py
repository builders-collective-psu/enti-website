"""Build the ESHIP content layer from the V4 snapshot without altering V1–V4.

Run with Python and beautifulsoup4 installed. Templates preserve the approved
WebGL layout; content lives in src/content/eship-v5.json.
"""
from pathlib import Path
import json
import html
from bs4 import BeautifulSoup, Comment

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'
MIRROR = PUBLIC / 'eship'
DATA = json.loads((ROOT / 'src/content/eship-v5.json').read_text(encoding='utf-8'))
TEMPLATES = ROOT / 'scripts/templates'
TEMPLATES.mkdir(exist_ok=True)
for name, source in [('eship-home.html', MIRROR/'index.html'), ('eship-page.html', MIRROR/'contact/index.html')]:
    target = TEMPLATES/name
    if not target.exists():
        target.write_text(source.read_text(encoding='utf-8'), encoding='utf-8')

def esc(value):
    return html.escape(str(value), quote=True)

def url(slug):
    return '/eship/' + (slug.strip('/')+'/' if slug else '')

def link(label, slug, cls='eship-link'):
    href = slug if slug.startswith(('https:', 'mailto:')) else url(slug)
    external = ' target="_blank" rel="noopener noreferrer"' if href.startswith('https:') else ''
    return f'<a class="{cls}" href="{esc(href)}"{external}>{esc(label)} <span aria-hidden="true">↗</span></a>'

def set_text(soup, selector, text):
    for element in soup.select(selector):
        element.clear()
        element.append(text)

def fragment(markup):
    return BeautifulSoup(markup, 'html.parser')

NAV = [('Home',''),('Updates','updates'),('Experiences','experiences'),('Program','program'),('Curriculum','curriculum'),('Newsroom','newsroom'),('Contact','contact')]
LIST = 'L-ENTI-MINOR'
ROUTES = {'news':'updates','works':'experiences','about':'program','stellla':'curriculum'}

SITE = 'ESHIP Engineering Entrepreneurship · Penn State'
SEO = {
    '': ('ESHIP Engineering Entrepreneurship | Penn State Product Innovation', 'ESHIP is Penn State Engineering Entrepreneurship: the ENTI minor Product Innovation cluster. Build real hardware, prototype products, and launch tech ventures.'),
    'program': 'Engineering Entrepreneurship at Penn State: the ENTI minor Product Innovation cluster in SEDI. Hands-on prototyping, customer discovery, and venture creation.',
    'curriculum': 'ESHIP curriculum for the Product Innovation cluster of the ENTI minor: six Penn State engineering entrepreneurship courses from ENGR 310 to capstone.',
    'experiences': 'ESHIP experiences: engineering entrepreneurship treks to Silicon Valley, NYC, Taiwan, and Korea, plus GameDay Ventures and the Builders Collective.',
    'grants': 'Fund your prototype with up to $500 from the Product Innovation Grant and earn the Penn State Product Innovation & Entrepreneurship Certificate.',
    'faculty': 'Meet ESHIP faculty and mentors: entrepreneurs teaching engineering entrepreneurship and product innovation at Penn State College of Engineering.',
    'ventures': 'Student ventures from Penn State Engineering Entrepreneurship: GameDay Ventures prototypes and the Builders Collective student maker community.',
    'videos': 'Watch ESHIP videos: Penn State Engineering Entrepreneurship, the EDI Building, and student product prototyping in the Product Innovation cluster.',
    'updates': 'Explore ESHIP: engineering entrepreneurship courses, prototype funding, global treks, and Product Innovation cluster opportunities at Penn State.',
    'newsroom': 'ESHIP newsroom: announcements from the Penn State ENTI minor mailing list. Subscribe for engineering entrepreneurship events, grants, and treks.',
    'contact': 'Contact Penn State Engineering Entrepreneurship (ESHIP) about the ENTI minor Product Innovation cluster, advising, prototype grants, and treks.',
    'privacypolicy': 'Privacy and external services for the ESHIP Engineering Entrepreneurship website, Penn State College of Engineering.',
    'license': 'About the ESHIP website for Penn State Engineering Entrepreneurship and the ENTI minor Product Innovation cluster.',
}
for value in SEO.values():
    assert len(value if isinstance(value, str) else value[1]) <= 160, value

def shell(soup, title, description, full_title=None):
    soup.html['lang'] = 'en'
    title = full_title or f'{title} | {SITE}'
    soup.title.string = title
    for meta in soup.select('meta[name="description"], meta[property="og:description"], meta[name="twitter:description"]'):
        meta['content'] = description
    for meta in soup.select('meta[property="og:url"]'):
        meta.decompose()
    for meta in soup.select('meta[property="og:title"], meta[name="twitter:title"]'):
        meta['content'] = title
    # The mirrored studio analytics must not receive this academic site's traffic.
    for script in soup.select('script'):
        if 'googletagmanager' in script.get('src','') or 'gtag(' in script.get_text():
            script.decompose()
    for selector, key in [('.Header__nav','nav'),('.Footer__top_links','footer')]:
        node = soup.select_one(selector)
        if not node:
            continue
        if key == 'nav':
            node.clear()
            for label, slug in NAV:
                node.append(fragment(f'<div class="Header__nav_item" data-page="{slug or "top"}"><a href="{url(slug)}"><span>{label}</span></a></div>'))
        else:
            node.clear()
            for column in [[('Home',''),('Experiences','experiences'),('Program','program')], [('Curriculum','curriculum'),('Grants & Certificate','grants'),('Faculty','faculty')], [('Student Ventures','ventures'),('Videos','videos'),('Newsroom & Subscribe','newsroom'),('Contact','contact')]]:
                node.append(fragment('<div class="Footer__column">'+''.join(link(a,b,'Footer__pageLink') for a,b in column)+'</div>'))
    for a in soup.select('a'):
        href=a.get('href','')
        if 'eship/' in href:
            for old, new in ROUTES.items():
                if href.rstrip('/') == url(old).rstrip('/'):
                    a['href']=url(new)
    # Contact now lives in the centre glass menu.
    for a in soup.select('.Header__contact'):
        a.decompose()
    menu=soup.select_one('.SideMenu__menu_inner')
    if menu and not menu.select_one('a[href="/eship/newsroom/"]'):
        # Appended last: the runtime marks side-menu items active by position.
        menu.append(fragment(f'<div class="SideMenu__menu_item"> <a href="{url("newsroom")}"> <span>Newsroom</span> </a> </div>'))
    for a,label,slug in zip(soup.select('.Footer__contact_button'), ['Contact','Advising'], ['contact','faculty']):
        a['href']=url(slug)
        a.attrs.pop('target',None)
        a.clear();a.append(label)
    for a,(label,href) in zip(soup.select('.SideMenu__social_link'), [('Penn State SEDI','https://www.sedi.psu.edu/'),('College of Engineering','https://www.engr.psu.edu/'),('Builders Collective','https://psu.builders'),('Startup Week','https://startupweek.psu.edu/')]):
        a['href']=href;a.clear();a.append(label)
    for node in soup.find_all(string=True):
        if node.parent.name not in ['script','style']:
            value=str(node).strip()
            if value in ['News','Works','About','stellla','Contact / Recruit','Top']:
                node.replace_with({'News':'Updates','Works':'Experiences','About':'Program','stellla':'Curriculum','Contact / Recruit':'Contact','Top':'Home'}[value])
            elif value in ['このサイトにはサウンドが含まれます。有効にしますか?','サウンドをオンにする','サウンドなしで進む']:
                node.replace_with({'このサイトにはサウンドが含まれます。有効にしますか?':'This experience includes sound. Would you like to enable it?','サウンドをオンにする':'Enable sound','サウンドなしで進む':'Continue without sound'}[value])
    for button in soup.select('button[aria-label]'):
        if any('\u3040' <= c <= '\u9fff' for c in button['aria-label']):
            button['aria-label']='Toggle sound'
    for a,label,slug in zip(soup.select('.Footer__privacyLicense_link'), ['Penn State Engineering','Penn State SEDI'], ['https://www.engr.psu.edu/','https://www.sedi.psu.edu/']):
        a['href']=slug;a.clear();a.append(label)
    set_text(soup,'.Footer__copyright','© 2026 ESHIP · College of Engineering · Penn State University')
    # Carried forward from V4's footer attribution.
    copyright=soup.select_one('.Footer__copyright')
    if copyright and not soup.select_one('.eship-credit-line'):
        copyright.insert_after(fragment('<p class="eship-credit-line">Designed and built by <a href="https://sahajtech.dev" target="_blank" rel="noopener noreferrer">sahajtech llc</a></p>'))
    # The footer <enti-intro> is the single source of truth for the opening loader.
    for overlay in soup.select('#loading-overlay'):
        overlay.decompose()
    if not soup.select_one('script[data-eship-intro-gate]'):
        # Play the opening sequence only on the first page of a visit, not on every full page load.
        soup.head.insert(0,fragment('<script data-eship-intro-gate>try{sessionStorage.getItem("eship-intro-seen")?document.documentElement.classList.add("eship-intro-seen"):sessionStorage.setItem("eship-intro-seen","1")}catch(e){}</script><style>.eship-intro-seen enti-intro[data-eship-opening]{display:none!important}</style>'))
    if not soup.select_one('enti-intro[mode="opening"]'):
        soup.body.insert(0,fragment('<enti-intro mode="opening" speed="1.5" data-eship-opening style="position:fixed;inset:0;z-index:100000"></enti-intro>'))
    if not soup.select_one('link[href="/eship-content.css"]'):
        soup.head.append(fragment('<link rel="stylesheet" href="/eship-content.css"><script defer src="/eship-content.js"></script>'))
    for comment in soup.find_all(string=lambda x:isinstance(x,Comment)):
        comment.extract()
    return soup

def image(path, alt, cls=''):
    return f'<img class="{cls}" src="{esc(path)}" alt="{esc(alt)}" loading="lazy" decoding="async">'

def card(title, text, slug, photo=None, kicker=''):
    return f'<article class="eship-card">'+(image(photo,title) if photo else '')+f'<div class="eship-card-body"><span class="eship-kicker">{esc(kicker)}</span><h2>{esc(title)}</h2><p>{esc(text)}</p>{link("Explore",slug)}</div></article>'

treks = sorted(reversed(DATA['treks']), key=lambda t: t['status'] != 'Upcoming')
ventures = [
    dict(id='gameday',destination='GameDay Ventures',type='ENGR 407 · Student Prototyping',status='Build & Test',image='/images/sedi-tailgate.jpg',summary='Design, 3D print, and fabricate original tailgate games. Test real prototypes with real fans at Beaver Stadium.',highlights=['Hands-on fabrication in the Learning Factory','Rapid iteration with live user feedback','Field tests at Beaver Stadium tailgates']),
    dict(id='builders',destination='Builders Collective',type='Student Builder Community',status='Student-led',image='/images/makerspace-students.jpg',summary='Connect with Penn State student builders. Share ideas, make physical products, and move from a first prototype to a working venture.',highlights=['A community for student founders and makers','Peer collaboration and practical prototyping','Explore the community at psu.builders'])
]
experiences=treks+ventures
PAGE_CONTENT={}

def course_id(course):
    return course['code'].lower().replace(' ','-')

# Homepage curriculum: the six-course pathway plus photos of what students build.
BUILDS=[('/images/makerspace-students.jpg','ENGR 407','Fabricate a working prototype','Students measuring and cutting a prototype build in the makerspace'),
        ('/images/sedi-tailgate.jpg','ENGR 407','Test it with real users at GameDay','Students testing tailgate game prototypes with fans'),
        ('/images/hardware-collab.jpg','ENGR 411','Study global hardware on a trek','ESHIP students and faculty on the Seoul trek'),
        ('/images/students-group.jpg','MAKERSPACE','Learn hands-on fabrication','Students assembling a laser-cut clock in a makerspace workshop')]
def curriculum_teaser():
    stops=''.join(f'<li><a href="{url("curriculum")}#{course_id(c)}"><span class="eship-path-step">{i+1:02d}</span><span class="eship-path-code">{esc(c["code"])}</span><span class="eship-path-title">{esc(c["title"])}</span></a></li>' for i,c in enumerate(DATA['courses']))
    builds=''.join(f'<figure>{image(src,alt)}<figcaption><span>{esc(code)}</span>{esc(caption)}</figcaption></figure>' for src,code,caption,alt in BUILDS)
    return f'<div class="eship-curriculum-teaser"><ol class="eship-pathway" aria-label="Six-course pathway">{stops}</ol><div class="eship-builds" aria-label="What you will build">{builds}</div></div>'

# V4 video showcase: one inline Vimeo player, with the other videos as selectable thumbnails.
THUMBS={'896007882':'https://i.vimeocdn.com/video/1771013397-6662821bdbce6a6aef0b2156150dcc3c51356aae90aba7ae7e2e8e7d522fcc01-d_640x360.jpg','855090940':'https://i.vimeocdn.com/video/1713612152-0cad2f5db318aa1a731728165bb4a7d027e65b558c15b3c63c693d17965fe33d-d_640x360.jpg','997986054':'https://i.vimeocdn.com/video/1914131286-929c202c7373aeb06fb0573a6bdec35901141afe1ee64a328a18b9b4fc5c269a-d_640x360.jpg'}
def vimeo(id):
    return f'https://player.vimeo.com/video/{id}?title=0&byline=0&portrait=0'
def video_player():
    first=DATA['videos'][0]
    thumbs=''.join(f'<li><button type="button" class="eship-video-thumb" data-eship-video="{esc(v["id"])}" data-title="{esc(v["title"])}" data-category="{esc(v["category"])}" data-description="{esc(v["description"])}" data-creator="{esc(v["creator"])}" aria-pressed="{"true" if i==0 else "false"}"><img src="{esc(THUMBS.get(v["id"],""))}" alt="" loading="lazy"><span class="eship-kicker">{esc(v["category"])}</span><span>{esc(v["title"])}</span></button></li>' for i,v in enumerate(DATA['videos']))
    return f'<section class="eship-player" data-eship-player><div class="eship-video"><iframe loading="lazy" src="{vimeo(first["id"])}" title="{esc(first["title"])}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><div class="eship-player-info"><span class="eship-kicker" data-eship-player-category>{esc(first["category"])}</span><h2 data-eship-player-title>{esc(first["title"])}</h2><p data-eship-player-description>{esc(first["description"])}</p><p class="eship-credit" data-eship-player-creator>{esc(first["creator"])}</p></div><ul class="eship-video-thumbs" aria-label="Choose a video">{thumbs}</ul></section>'

PAGE_CONTENT['program']=('The Program','Engineering Entrepreneurship at Penn State', '''<div class="eship-lead"><p>Build real hardware.<br>Launch tech ventures.</p><span>Engineering Entrepreneurship brings technical ideas into the real world through hands-on prototyping, customer discovery, and venture creation.</span></div><div class="eship-stats"><div><strong>6</strong><span>Courses in the V4 pathway</span></div><div><strong>18–20</strong><span>Credits · ENTI Product Innovation cluster</span></div><div><strong>$500</strong><span>Up to $500 in prototype funding</span></div></div>'''+image('/images/makerspace-students.jpg','Penn State students working in a makerspace','eship-banner')+'<section class="eship-section"><h2>Engineer the product. Understand the business.</h2><p>Part of the Entrepreneurship and Innovation (ENTI) minor, the Product Innovation cluster connects CAD, electronics, firmware, and fabrication with unit economics, intellectual property, market validation, and entrepreneurial leadership.</p><p>Based in the School of Engineering Design and Innovation (SEDI), Penn State College of Engineering. Find us in the Engineering Design and Innovation Building, Room 319, University Park.</p></section>'+'<h2>See the program in action</h2>'+video_player()+'<div class="eship-grid">'+card('Curriculum','From an entrepreneurial mindset to a capstone venture launch.','curriculum')+card('Grants & Certificate','Fund a prototype or build a focused academic credential.','grants')+card('Faculty & Mentors','Meet the entrepreneurs teaching the next generation of engineers.','faculty')+'</div>')

PAGE_CONTENT['experiences']=('Experiences','Global treks and student builds','<p class="eship-intro-copy">Learn beyond the classroom. Explore manufacturing, startups, and venture ecosystems, then put that experience to work in a real prototype.</p><div class="eship-grid">'+''.join(card(t['destination'],t['summary'],'experiences/'+t['id'],t['image'],t['type']) for t in experiences)+'</div>')
for t in experiences:
    extra=link('Builders Collective','https://psu.builders') if t['id']=='builders' else link('See GameDay coverage','https://onwardstate.com/2024/09/06/theres-nothing-like-it-out-there-penn-state-sophomore-reinvents-cup-pong/') if t['id']=='gameday' else link('Ask about a trek','contact')
    PAGE_CONTENT['experiences/'+t['id']]=(t['destination'],t['type'],f'<p class="eship-intro-copy">{esc(t["summary"])}</p>'+image(t['image'],t['destination'],'eship-banner')+f'<section class="eship-section"><span class="eship-kicker">{esc(t["type"])}</span><h2>Inside the experience</h2><ul class="eship-list">'+''.join('<li>'+esc(v)+'</li>' for v in t['highlights'])+'</ul>'+extra+'</section>')

PAGE_CONTENT['curriculum']=('Curriculum','Product Innovation · ENTI minor','<p class="eship-intro-copy">Six courses connect leadership, prototyping, business fundamentals, commercialization, and venture creation. Explore each stage below.</p><div class="eship-course-list">'+''.join(f'<details class="eship-course" id="{course_id(c)}" {"open" if i==0 else ""}><summary><span class="eship-kicker">{esc(c["code"])}</span><h2>{esc(c["title"])}</h2><span>{esc(c["credits"])} <b aria-hidden="true">+</b></span></summary><div class="eship-course-body"><span class="eship-kicker">{esc(c["stage"])}</span><h3>{esc(c["subtitle"])}</h3><p>{esc(c["description"])}</p><div class="eship-grid eship-grid-two"><div><h4>Prerequisite</h4><p>{esc(c["prereq"])}</p></div><div><h4>What you build</h4><p>{esc(c["keyDeliverable"])}</p></div></div><ul class="eship-tags">'+''.join('<li>'+esc(v)+'</li>' for v in c['skills'])+'</ul></div></details>' for i,c in enumerate(DATA['courses']))+'</div><section class="eship-section"><h2>Plan your pathway</h2><p>Course and prerequisite information is carried over from V4. Talk with an advisor about your schedule and current requirements.</p>'+link('Connect with faculty','faculty')+link('Explore the certificate','grants')+'</section>')

PAGE_CONTENT['grants']=('Grants & Certificate','Build your next step','<div class="eship-grid eship-grid-two">'+card('Up to $500 for a prototype','The Product Innovation Grant supports equity-free purchases of 3D prints, sensors, circuit boards, and tools. Open to students enrolled in or who have completed ENGR 310.','https://pennstate.qualtrics.com/jfe/form/SV_2gdNylnJOKQFIBE',kicker='PRODUCT INNOVATION GRANT')+card('Product Innovation & Entrepreneurship Certificate','Nine credits: ENGR 411 plus two courses selected from ENGR 310, ENGR 407, and ENGR 415.','https://bulletins.psu.edu/undergraduate/colleges/engineering/product-innovation-entrepreneurship-certificate/#programrequirementstext',kicker='ACADEMIC CREDENTIAL')+card('ENtern','Connect students with paid startup internships and give growing ventures access to engineering talent.','https://sites.psu.edu/entern/sponsor-submission-form/',kicker='STARTUP EXPERIENCE')+card('Startup Week','Explore Penn State’s entrepreneurship community, meet founders, and connect with support for the next stage of a venture.','https://startupweek.psu.edu/',kicker='CAMPUS ECOSYSTEM')+'</div><section class="eship-section"><h2>Keep building beyond the classroom.</h2><p>V4 points students toward Happy Valley LaunchBox, FastTrack, and Summer Founders as next steps for a promising venture.</p>'+link('Ask about opportunities','contact')+'</section>')

PAGE_CONTENT['faculty']=('Faculty & Mentors','Learn from people who have built it','<div class="eship-grid eship-grid-two">'+''.join('<article class="eship-card eship-person">'+image(f['image'],f['name'])+'<div class="eship-card-body"><span class="eship-kicker">'+esc(f['role'])+'</span><h2>'+esc(f['name'])+'</h2><p>'+esc(f['bio'])+'</p><ul class="eship-tags">'+''.join('<li>'+esc(v)+'</li>' for v in f['focus'])+'</ul><p>'+esc(f['office'])+'</p>'+link('Email '+f['name'],'mailto:'+f['email'])+link('Penn State profile',f['directoryUrl'])+'</div></article>' for f in DATA['faculty'])+'</div>')
PAGE_CONTENT['ventures']=('Student Ventures','From a sketch to a real-world test','<div class="eship-grid eship-grid-two">'+''.join(card(t['destination'],t['summary'],'experiences/'+t['id'],t['image'],t['type']) for t in ventures)+'</div><section class="eship-section"><h2>Build with a team.</h2><p>ENGR 407 puts product ideas in front of actual users. The Builders Collective connects students who want to keep making, testing, and learning together.</p>'+link('Explore ENGR 407','curriculum')+'</section>')
PAGE_CONTENT['videos']=('Videos','See ESHIP in action',video_player())
PAGE_CONTENT['updates']=('Explore ESHIP','Courses, opportunities, and stories','<p class="eship-intro-copy">Find the resources that move your next idea forward.</p><div class="eship-grid">'+card('Prototype funding','Apply for up to $500 in Product Innovation Grant support.','grants')+card('Student builds','See GameDay Ventures and connect with the Builders Collective.','ventures','/images/sedi-tailgate.jpg')+card('Global treks','Explore the startup and manufacturing ecosystems featured in V4.','experiences','/images/exp-seoul-1.jpg')+card('Program videos','Go inside the EDI Building and see student prototyping in action.','videos')+'</div>')
PAGE_CONTENT['contact']=('Contact & Advising','Start a conversation','<div class="eship-grid eship-grid-two"><section class="eship-section"><h2>Engineering Entrepreneurship</h2><p>School of Engineering Design and Innovation<br>Penn State College of Engineering</p><p>Engineering Design and Innovation Building<br>Room 319 · University Park, PA 16802</p>'+link('eship@engr.psu.edu','mailto:eship@engr.psu.edu')+link('Meet your faculty','faculty')+'</section><form class="eship-contact-form" data-eship-contact><label>Your name<input name="name" autocomplete="name" required></label><label>Your email<input name="email" type="email" autocomplete="email" placeholder="abc1234@psu.edu" required></label><label>What would you like to discuss?<select name="topic"><option>Courses & advising</option><option>Prototype grant</option><option>Global treks</option><option>Student ventures</option><option>Listserv access</option></select></label><label>Your message<textarea name="message" rows="5" required></textarea></label><button class="eship-link" type="submit">Compose email ↗</button><p class="eship-credit">Opens a draft in your email app. Send it there to contact the program.</p><p role="status" data-eship-contact-status></p></form></div>')
SUBSCRIBE=f'''<form class="eship-subscribe" data-eship-subscribe action="https://lists.psu.edu/cgi-bin/wa" method="post" target="_blank" accept-charset="UTF-8"><input type="hidden" name="SUBED2" value="{LIST}"><input type="hidden" name="A" value="1"><input type="hidden" name="L" value="{LIST}"><input type="hidden" name="q" value=""><input type="hidden" name="t" value=""><input type="hidden" name="0" value=""><input type="hidden" name="b" value="Subscribe"><div class="eship-subscribe-copy"><span class="eship-kicker">ENTI MINOR MAILING LIST</span><h2>Get ESHIP news in your inbox.</h2><p>Course announcements, grant deadlines, treks, and events from the Penn State {LIST} list. Use your Penn State email if you have one.</p></div><div class="eship-subscribe-fields"><label>Full name<input name="p" autocomplete="name" required maxlength="100"></label><label>Penn State email<input name="s" type="email" autocomplete="email" inputmode="email" placeholder="abc1234@psu.edu" required maxlength="254"></label><button class="eship-link" type="submit">Subscribe ↗</button><p class="eship-credit">Opens Penn State LISTSERV in a new tab. Confirm from the email it sends to finish subscribing.</p><p role="status" data-eship-subscribe-status></p></div></form>'''
PAGE_CONTENT['newsroom']=('Newsroom','Announcements from the ENTI minor list',SUBSCRIBE+f'<section class="eship-news" data-eship-news aria-live="polite" aria-busy="true"><div class="eship-news-head"><h2>Latest from the list</h2>{link("Full archive","https://lists.psu.edu/cgi-bin/wa?A0="+LIST)}</div><ol class="eship-news-list" data-eship-news-list></ol><p class="eship-news-status" data-eship-news-status>Loading announcements…</p></section>')
PAGE_CONTENT['privacypolicy']=('Privacy & External Services','About this local academic preview','<section class="eship-section"><p>This ESHIP preview uses content from V4. Program videos are embedded from Vimeo; external application forms open on Penn State services. The contact form opens your email app and does not submit or store a message on this website.</p><p>The original studio analytics have been removed. Review the privacy terms of external services when you visit them.</p>'+link('Contact the program','contact')+'</section>')
PAGE_CONTENT['license']=('About This Preview','ESHIP · Penn State','<section class="eship-section"><p>An academic preview for Engineering Entrepreneurship, Penn State College of Engineering. Program copy and academic images were migrated from V4; the approved interactive visual experience is retained.</p>'+link('Penn State College of Engineering','https://www.engr.psu.edu/')+link('Penn State SEDI','https://www.sedi.psu.edu/')+'</section>')

home=BeautifulSoup((TEMPLATES/'eship-home.html').read_text(encoding='utf-8'),'html.parser')
shell(home,None,SEO[''][1],SEO[''][0])
set_text(home,'.News__newsTitle','Explore ESHIP')
for node,(label,title,slug) in zip(home.select('.News__newsItem'), [('COURSES','Build your Product Innovation pathway','curriculum'),('FUNDING','Prototype funding up to $500','grants'),('ADVISING','Meet the ESHIP faculty','faculty')]):
    set_text(node,'.News__newsDate',label)
    a=node.select_one('.News__newsLink');a['href']=url(slug);a.clear();a.append(title)
for node,t in zip(home.select('[data-works_item]'),experiences):
    set_text(node,'.Works__item_date',t['type'])
    set_text(node,'.Works__item_impression_title',t['status'])
    a=node.select_one('.Works__item_title_link');a['href']=url('experiences/'+t['id']);a.clear();a.append(t['destination'])
    set_text(node,'.Works__item_title_ja',t['summary'])
    categories=node.select_one('.Works__item_categoryList')
    if categories:
        categories.clear();categories.append(fragment('<li>'+link('Explore experience','experiences/'+t['id'])+'</li>'))
for node,t in zip(home.select('[data-top_works_item]'),experiences):
    node['data-top_works_item']=t['image'];node['data-works_id']=t['id']
    for img in node.select('img'):img['src']=t['image'];img['alt']=t['destination']
for a in home.select('#more-works-link'):
    a['href']=url('experiences');a.clear();a.append('All Experiences')
for prefix,lines,sub,title in [('mission',['Build real hardware.','Find real customers.','Launch your venture.'],'Engineering Entrepreneurship · Penn State College of Engineering','PROGRAM'),('vision',['Make something useful.','Test it in the world.','Keep building.'],'Turn technical possibility into products people need.','PURPOSE')]:
    for i,text in enumerate(lines):set_text(home,f'[data-{prefix}-text] [data-marker-{i}]',text)
    set_text(home,f'[data-{prefix}-text_en]',sub)
    node=home.select_one(f'[data-{prefix}-title]')
    if node:
        node.clear();node.append(fragment((PUBLIC/f'common/{title.lower()}-outline.svg').read_text(encoding='utf-8')))
for node,(title,slug,text,sub) in zip(home.select('[data-service_id]'), [('Prototype Funding','grants','Get up to $500 to turn your idea into a physical prototype. Support for 3D prints, sensors, circuit boards, and tools.','Product Innovation Grant · Enrolled in or completed ENGR 310'),('Faculty & Mentors','faculty','Learn from entrepreneurs who have built hardware ventures, launched products, and brought new ideas to market.','Ted Graef · Brad Groznik · Engineering Design and Innovation Building')]):
    node.select_one('.Service__item_link')['href']=url(slug)
    set_text(node,'[data-service_title]',title);set_text(node,'.Service__item_description',text);set_text(node,'.Service__item_description_en',sub)
    img=node.select_one('img');img['src']='/common/eship-head.svg';img['alt']=title
set_text(home,'.Stellla__main_text > p','Your path from an idea to a working product. Six courses in leadership, prototyping, business, commercialization, and venture creation.')
set_text(home,'.Stellla__en > p','Product Innovation cluster · Entrepreneurship and Innovation minor · Penn State')
stellla_main=home.select_one('.Stellla__main')
if stellla_main and not stellla_main.select_one('.eship-curriculum-teaser'):
    stellla_main.append(fragment(curriculum_teaser()))
for img in home.select('.Stellla__main_logo_img img'):
    img['src']='/common/curriculum-title.svg';img['alt']='Curriculum'
# Labels use the same scroll anchors and WebGL hooks as the approved experience.
for node in home.find_all(string=True):
    if node.parent.name in ['script','style']:continue
    if str(node).strip() in ['WORKS','Works','ABOUT','About','SERVICE','Service','VISION','Vision','stellla']:
        node.replace_with({'WORKS':'EXPERIENCES','Works':'Experiences','ABOUT':'PROGRAM','About':'Program','SERVICE':'PATHWAYS','Service':'Pathways','VISION':'PURPOSE','Vision':'Purpose','stellla':'Curriculum'}[str(node).strip()])
(MIRROR/'index.html').write_text(str(home),encoding='utf-8')

base=(TEMPLATES/'eship-page.html').read_text(encoding='utf-8')
def emit(slug, content):
    title, subtitle, markup=content
    section=slug.split('/')[0]
    seo=SEO.get(slug) or SEO.get(ROUTES.get(section,section))
    if slug.startswith('experiences/'): seo=f'{title}: {subtitle}. A Penn State Engineering Entrepreneurship (ESHIP) experience in the Product Innovation cluster.'[:160]
    soup=shell(BeautifulSoup(base,'html.parser'),title,seo or subtitle)
    main=soup.select_one('main');main.clear()
    main.append(fragment(f'<div class="eship-content"><header class="eship-page-heading"><span class="eship-kicker">ESHIP / PENN STATE</span><h1 id="animated-title">{esc(title)}</h1><p>{esc(subtitle)}</p></header>{markup}<nav class="eship-page-end" aria-label="Continue exploring">{link("Home","")}{link("The program","program")}{link("Contact & advising","contact")}</nav></div>'))
    dest=MIRROR/slug/'index.html';dest.parent.mkdir(parents=True,exist_ok=True);dest.write_text(str(soup),encoding='utf-8')
for slug,content in PAGE_CONTENT.items():emit(slug,content)
# Preserve existing shared URLs, with ESHIP content rather than retired studio pages.
for old,new in ROUTES.items():emit(old,PAGE_CONTENT[new])
details=sorted((MIRROR/'works/detail').glob('*/index.html'))
for path,t in zip(details,experiences):emit(path.parent.relative_to(MIRROR).as_posix(),PAGE_CONTENT['experiences/'+t['id']])
for path in (MIRROR/'works').glob('*/index.html'):
    if path.parent.name!='detail':emit(path.parent.relative_to(MIRROR).as_posix(),PAGE_CONTENT['experiences'])
for name,text in [('experiences','EXPERIENCES'),('pathways','PATHWAYS'),('curriculum','CURRICULUM')]:
    (PUBLIC/f'common/{name}-title.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="2048" height="350" viewBox="0 0 2048 350"><text x="1024" y="280" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-weight="700" font-size="{250 if name=="experiences" else 280}" textLength="2000" lengthAdjust="spacingAndGlyphs">{text}</text></svg>',encoding='utf-8')
print(f'Built ESHIP homepage and {len(PAGE_CONTENT)} academic pages; migrated legacy routes.')
