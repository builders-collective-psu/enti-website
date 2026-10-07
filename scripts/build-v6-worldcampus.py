"""Builds V6: the Penn State World Campus layout carrying the E-SHIP (V4/V5) content.

Inputs: scripts/templates/worldcampus-{home,program}.html (from scripts/mirror-worldcampus.mjs)
and src/content/eship-v5.json. Output: public/versions/v6/**/index.html, plus copies of the
E-SHIP photos so the snapshot stays self-contained. Rerun after editing copy here or in the JSON.
"""
import copy
import html
import json
import re
import shutil
from pathlib import Path

from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'
OUT = PUBLIC / 'versions/v6'
TEMPLATES = ROOT / 'scripts/templates'
DATA = json.loads((ROOT / 'src/content/eship-v5.json').read_text(encoding='utf-8'))
BASE = '/versions/v6/'
TREK_NAMES = {'korea': 'Seoul', 'taiwan': 'Taiwan', 'nyc': 'New York City', 'sf': 'Silicon Valley'}
LIST = 'L-ENTI-MINOR'
EMAIL = 'eship@engr.psu.edu'


def esc(value):
    return html.escape(str(value), quote=True)


def url(slug=''):
    """'curriculum#courses' → '/versions/v6/curriculum/#courses'; absolute links pass through."""
    if slug.startswith(('http', 'mailto:', '#', '/')):
        return slug
    path, _, anchor = slug.partition('#')
    return BASE + (path.strip('/') + '/' if path.strip('/') else '') + (f'#{anchor}' if anchor else '')


def image(name):
    """Copies an E-SHIP photo into the snapshot and returns its published path."""
    source = PUBLIC / name.lstrip('/')
    target = OUT / 'images' / source.name
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(source, target)
    return f'{BASE}images/{source.name}'


def icon(name, box='0 0 512 512', cls=''):
    return f'<svg aria-hidden="true" class="sprite sprite--{name} {cls}" viewBox="{box}"><use xlink:href="#{name}"></use></svg>'


def fragment(markup):
    return BeautifulSoup(markup, 'html.parser')


def contrast(title):
    """World Campus headings highlight a phrase: 'Build *Real Hardware*' → contrasting span."""
    return re.sub(r'\*(.+?)\*', r'<span class="text--contrasting">\1</span>', title)


def plain(title):
    return title.replace('*', '')


# ---------------------------------------------------------------- navigation
NAV = [
    ('Home', '', []),
    ('Curriculum', 'curriculum', [('6-Course Sequence', 'curriculum#courses'), ('Product Innovation Cluster', 'curriculum#cluster'), ('Declare the Minor', 'curriculum#how-to-apply')]),
    ('Grants and Programs', 'program', [('Product Innovation Grant', 'program#grant'), ('Certificate', 'program#certificate'), ('ENtern Internships', 'program#entern'), ('Startup Week', 'program#events')]),
    ('Experiences', 'experiences', [(TREK_NAMES[t['id']], f"experiences#{t['id']}") for t in DATA['treks']]),
    ('Ventures', 'ventures', [('GameDay Ventures', 'ventures#gameday'), ('Builders Collective', 'ventures#builders')]),
    ('Faculty', 'faculty', []),
    ('Videos', 'videos', []),
    ('Newsroom', 'newsroom', []),
]
UTILITY = [('Join the Mailing List', url('newsroom#subscribe')), ('Penn State Engineering', 'https://www.engr.psu.edu'), ('Contact', url('contact'))]


def horizontal_menu():
    items = []
    for label, slug, children in NAV:
        sub = ''
        if children:
            key = f'{slug}-submenu--2'
            links = ''.join(f'<li class="horizontal-menu__item horizontal-menu__item--2"><a class="horizontal-menu__link horizontal-menu__link--2" href="{url(href)}">{esc(text)}</a></li>' for text, href in children)
            sub = f'<button aria-controls="{key}" aria-expanded="false" class="horizontal-menu__toggle"><span class="visually-hidden">Toggle {esc(label)} menu</span><span class="horizontal-menu__chevron">{icon("fas-chevron-down", "0 0 448 512")}</span></button><ul class="horizontal-menu__menu horizontal-menu__menu--2" id="{key}">{links}</ul>'
        items.append(f'<li class="horizontal-menu__item horizontal-menu__item--1"><a class="horizontal-menu__link horizontal-menu__link--1" href="{url(slug)}">{esc(label)}</a>{sub}</li>')
    return f'<nav aria-label="main" class="horizontal-menu"><ul class="horizontal-menu__menu horizontal-menu__menu--1" id="main--2">{"".join(items)}</ul></nav>'


def vertical_menu(suffix=''):
    items = []
    for label, slug, children in NAV:
        sub = ''
        if children:
            key = f'{slug}-submenu{suffix}'
            links = ''.join(f'<li class="vertical-menu__item vertical-menu__item--2"><a class="vertical-menu__link vertical-menu__link--2 vertical-menu__link--tight" href="{url(href)}">{esc(text)}</a></li>' for text, href in children)
            sub = f'<button aria-controls="{key}" aria-expanded="false" class="vertical-menu__toggle"><span class="visually-hidden">Toggle {esc(label)} menu</span><span class="vertical-menu__chevron">{icon("fas-chevron-down", "0 0 448 512")}</span></button><ul class="vertical-menu__menu vertical-menu__menu--2" id="{key}" style="height:0;overflow:hidden;">{links}</ul>'
        items.append(f'<li class="vertical-menu__item vertical-menu__item--1"><a class="vertical-menu__link vertical-menu__link--1 vertical-menu__link--tight" href="{url(slug)}">{esc(label)}</a>{sub}</li>')
    utility = ''.join(f'<li class="utility-menu__item"><a class="utility-menu__link" href="{href}">{esc(text)}</a></li>' for text, href in UTILITY)
    return f'<div class="utility-nav-small-viewports"><nav aria-label="main" class="vertical-menu"><ul class="vertical-menu__menu vertical-menu__menu--1" id="main{suffix}">{"".join(items)}</ul></nav><ul class="utility-menu" role="list">{utility}</ul></div>'


def footer_menu():
    items = []
    for label, slug, children in NAV:
        sub = ''
        if children:
            links = ''.join(f'<li class="menu-footer-main__item"><a class="menu-footer-main__link" href="{url(href)}">{esc(text)}</a></li>' for text, href in children)
            sub = f'<button aria-expanded="false" class="menu-footer-main__toggle"><span class="visually-hidden">Toggle {esc(label)} menu</span>{icon("fas-plus-circle")}</button><ul class="menu-footer-main__submenu" style="height: 0;">{links}</ul>'
        items.append(f'<li class="menu-footer-main__item"><a class="menu-footer-main__link" href="{url(slug)}">{esc(label)}</a>{sub}</li>')
    items.append(f'<li class="menu-footer-main__item"><a class="menu-footer-main__link" href="{url("contact")}">Contact</a></li>')
    return f'<nav aria-labelledby="block-mainnavigation-menu" id="block-mainnavigation" role="navigation"><h2 class="visually-hidden" id="block-mainnavigation-menu">Main navigation</h2><ul class="menu-footer-main">{"".join(items)}</ul></nav>'


def eship_mark(soup):
    """E-SHIP lockup: the World Campus shield and PennState wordmark, with our program line beneath."""
    mark = soup.find('svg', id='wc-mark')
    if not mark or soup.find('svg', id='eship-mark'):
        return
    lockup = copy.copy(mark)
    lockup['id'] = 'eship-mark'
    words = lockup.find_all('path')[-1]
    # The wordmark is one path; keep the PennState subpaths (upper line) and drop "World Campus".
    parts = re.split(r'(?=M)', words['d'])
    words['d'] = ''.join(p for p in parts if not (m := re.match(r'M\s*([\d.]+)[ ,]([\d.]+)', p)) or float(m.group(2)) < 35)
    text = soup.new_tag('text', attrs={'x': '79.5', 'y': '57', 'fill': 'var(--wc-mark-color)', 'class': 'eship-mark__program', 'textLength': '147', 'lengthAdjust': 'spacingAndGlyphs'})
    text.string = 'Engineering Entrepreneurship'
    lockup.append(text)
    mark.insert_after(lockup)


def shell(soup, slug, title, description):
    """Rebrands the World Campus chrome (head, header, menus, footer) for E-SHIP."""
    head = soup.head
    for tag in head.find_all('script'):
        if tag.get('type') == 'application/ld+json' or (not tag.get('type') and 'dataLayer' in (tag.string or '')):
            tag.decompose()
    # Drop the World Campus prospect chat (Salesforce), tag manager, and reCAPTCHA settings.
    settings = soup.find('script', attrs={'data-drupal-selector': 'drupal-settings-json'})
    if settings:
        values = json.loads(settings.string)
        for key in ('salesforce_mfw', 'gtm', 'gtag', 'recaptcha_sitekey'):
            values.pop(key, None)
        settings.string = json.dumps(values, separators=(',', ':'))
    for tag in head.find_all('link'):
        if tag.get('rel') and set(tag['rel']) & {'canonical', 'shortlink', 'alternate', 'preconnect', 'dns-prefetch', 'preload'}:
            tag.decompose()
    for tag in head.find_all('meta'):
        if tag.get('property', '').startswith(('og:', 'article:', 'fb:')) or tag.get('name', '').startswith(('twitter:', 'keywords', 'robots', 'Generator', 'google', 'facebook')):
            tag.decompose()
    head.title.string = f'{title} | Engineering Entrepreneurship | Penn State' if slug else 'Engineering Entrepreneurship (E-SHIP) | Penn State College of Engineering'
    meta = head.find('meta', attrs={'name': 'description'})
    meta['content'] = description
    head.append(fragment('<meta name="robots" content="noindex"><meta name="review-version" content="v6">'
                         '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
                         '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;600;700;800&family=Figtree:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap">'
                         f'<link rel="stylesheet" href="{BASE}v6.css">'))
    body = soup.body
    for tag in body.find_all('script'):
        if not tag.get('type') and 'dataLayer' in (tag.string or ''):
            tag.decompose()
    body.append(fragment('<script src="/eship-content.js" defer></script>'))

    eship_mark(soup)
    for logo in soup.select('a.branding__logo'):
        logo['href'] = url()
        logo.clear()
        logo.append(fragment(f'<svg class="sprite sprite--wc-mark" aria-hidden="true" viewBox="0 0 229 72"><use xlink:href="#eship-mark"></use></svg><span class="visually-hidden">Penn State Engineering Entrepreneurship</span>'))
    for tagline in soup.select('.branding__tagline'):
        tagline.clear()
        tagline.append(fragment('Build real hardware. <strong>Launch ventures.</strong>'))

    for nav in soup.select('nav.horizontal-menu'):
        nav.replace_with(fragment(horizontal_menu()))
    # Each small-viewport menu instance needs unique ids for its aria-controls toggles.
    for index, nav in enumerate(soup.select('.utility-nav-small-viewports')):
        nav.replace_with(fragment(vertical_menu(f'--m{index}')))
    for menu in soup.select('.utility-nav-large-viewports .utility-menu'):
        menu.clear()
        menu.append(fragment(''.join(f'<li class="utility-menu__item"><a class="utility-menu__link" href="{href}">{esc(text)}</a></li>' for text, href in UTILITY)))
    # Site search belongs to World Campus; E-SHIP has nine pages and a menu.
    for search in soup.select('.block--views-exposed-filter-blocksearchstax-search-page'):
        search.decompose()
    for cta in soup.select('a.cta-block--apply-now, .program-sticky-primary-content__cta a.cta-block:first-child'):
        cta['href'] = url('curriculum#how-to-apply')
        set_label(cta, 'Declare the Minor')
    for cta in soup.select('a.cta-block--request-info, .program-sticky-primary-content__cta a.cta-block:last-child'):
        cta['href'] = url('contact')
        set_label(cta, 'Contact E-SHIP')
    for cta in soup.select('[data-cta-url]'):
        cta['data-cta-url'] = cta['href']

    for nav in soup.select('#block-mainnavigation'):
        nav.replace_with(fragment(footer_menu()))
    resources = soup.select_one('.menu-resources')
    if resources:
        resources.clear()
        resources.append(fragment(''.join(f'<li class="menu-resources__item"><a class="menu-resources__link" href="{href}">{esc(text)}</a></li>' for text, href in [
            ('Contact and Advising', url('contact')), ('Newsroom and Mailing List', url('newsroom')), ('Program Videos', url('videos')), ('Declare the Minor', url('curriculum#how-to-apply'))])))
    audiences = soup.select_one('.menu-information-for__menu')
    if audiences:
        audiences.clear()
        audiences.append(fragment(''.join(f'<li class="menu-information-for__item"><a class="menu-information-for__link" href="{href}" target="_blank" rel="noopener noreferrer">{esc(text)}</a></li>' for text, href in [
            ('College of Engineering', 'https://www.engr.psu.edu'), ('School of Engineering Design and Innovation', 'https://www.sedi.psu.edu'),
            ('Happy Valley LaunchBox', 'https://launchbox.psu.edu'), ('Penn State Startup Week', 'https://startupweek.psu.edu')])))
    contact = soup.select_one('.footer-contact__contact')
    if contact:
        for item in contact.select('.footer-contact__item'):
            item.decompose()
        contact.append(fragment(f'<div class="footer-contact__item"><span class="footer-contact__prefix">Email:</span> <a class="footer-contact__link" href="mailto:{EMAIL}">{EMAIL}</a></div>'
                                f'<div class="footer-contact__item"><span class="footer-contact__prefix">Mailing list:</span> <a class="footer-contact__link" href="{url("newsroom")}">{LIST}</a></div>'))
    address = soup.select_one('.footer-contact__address')
    if address:
        address.clear()
        address.append(fragment('School of Engineering Design and Innovation<br>Engineering Design and Innovation Building, Room 319<br>The Pennsylvania State University<br>University Park, PA 16802<br>'))
    for icons in soup.select('.footer-contact__icons'):
        icons.decompose()
    for link in soup.select('.menu-legal__link'):
        if 'worldcampus.psu.edu/accessibility' in link['href']:
            link['href'] = 'https://accessibility.psu.edu'
        elif 'worldcampus.psu.edu/privacy-policy' in link['href']:
            link['href'] = 'https://www.psu.edu/web-privacy-statement'
        elif 'consumer-information' in link['href']:
            link['href'] = 'https://www.engr.psu.edu'
            link.string = 'Penn State College of Engineering'


def set_label(element, text):
    label = element.select_one('.button__label')
    (label or element).string = text


def finalize(soup, slug):
    """Points leftover World Campus links back into the snapshot so reviewers stay inside V6."""
    for tag in soup.find_all(href=True):
        href = tag['href']
        if href.startswith('/') and not href.startswith(('/versions/v6', '/eship-content', '//')):
            tag['href'] = url()
        elif href.startswith('https://www.worldcampus.psu.edu'):
            tag['href'] = url()
    for tag in soup.select('[data-drupal-link-system-path]'):
        del tag['data-drupal-link-system-path']
    target = OUT / slug / 'index.html' if slug else OUT / 'index.html'
    target.parent.mkdir(parents=True, exist_ok=True)
    markup = str(soup).replace('Penn State World Campus', 'Penn State Engineering Entrepreneurship').replace('xlink:href="#wc-mark"', 'xlink:href="#eship-mark"')
    target.write_text(markup, encoding='utf-8')
    print('wrote', target.relative_to(ROOT))


# ---------------------------------------------------------------- components (World Campus markup)
def wysiwyg(markup):
    return f'<div class="wysiwyg">{markup}</div>'


def read_more(text, href):
    external = ' target="_blank" rel="noopener noreferrer"' if href.startswith('http') else ''
    return f'<a class="read-more" href="{url(href)}"{external}><span class="read-more__text">{esc(text)}</span><span class="read-more__chevron">{icon("fas-chevron-right", "0 0 320 512")}</span></a>'


def button(text, href, alt=False):
    external = ' target="_blank" rel="noopener noreferrer"' if href.startswith('http') else ''
    return f'<a class="button{" button--alt" if alt else ""}" href="{url(href)}"{external}><span class="button__label">{esc(text)}</span></a>'


def at_a_glance(items):
    blocks = ''.join(
        f'<div class="block" data-block-weight="1" data-valign="top"><div class="at-a-glance-item" data-child-count="{len(items)}"><h2 class="at-a-glance-item__heading heading heading--no-overline"><span class="at-a-glance-item__heading-text">{esc(head)}</span></h2><div class="at-a-glance-item__content">{wysiwyg(f"<p>{text}</p>")}</div></div></div>'
        for head, text in items)
    return f'<div class="layout layout--at-a-glance layout--narrow layout--vspace-large layout--at-a-glance--{len(items)} bg bg--light-grey bg--padding-large bg--narrow" data-light=""><div class="bg__content"><div class="layout__content"><div class="layout__region layout__region--content">{blocks}</div></div></div></div>'


def disclosure(anchor, title, intro, more, expand, grey=False):
    """The World Campus 'progressive disclosure' section: intro, Learn More button, hidden detail."""
    bg_open, bg_close, cls = '', '', ''
    if grey:
        cls = ' bg bg--light-grey bg--hub-geometric-topright bg--padding-large bg--narrow'
        bg_open = f'<div class="bg__sprites"><div class="bg__sprite bg__sprite--hub-geometric bg__sprite--1">{icon("hub-geometric", "0 0 719.5 718.4")}</div></div><div class="bg__content">'
        bg_close = '</div>'
    more_markup = ''
    if more:
        more_markup = (f'<button aria-expanded="false" class="expandable-section__expand button--raised button button--expand-to-fit" type="button"><span class="button__label">{esc(expand)}</span><span class="button__icon">{icon("fas-chevron-down", "0 0 448 512")}</span></button>'
                       f'<div class="expandable-section__content" style="height:0;overflow:hidden;"><div class="layout__region layout__region--more">{more}</div></div>'
                       f'<button aria-expanded="false" class="expandable-section__collapse button--raised button button--expand-to-fit" type="button"><span class="button__label">Close {esc(expand)}</span><span class="button__icon">{icon("fas-chevron-up", "0 0 448 512")}</span></button>')
    return (f'<div class="layout layout--progressive-disclosure layout--narrow layout--vspace-large{cls}"{" data-light" if grey else ""}>{bg_open}<div class="layout__content">'
            f'<div class="expandable-section" data-interactive-component="" id="{anchor}" data-toc-label="{esc(plain(title))}"><div class="expandable-section__intro"><div class="layout__region layout__region--intro"><div class="block block--inline-blockpd-intro">'
            f'<div class="pd-intro"><h2>{contrast(title)}</h2>{wysiwyg(intro)}</div></div></div></div>{more_markup}</div></div>{bg_close}</div>')


def block(markup, cls=''):
    return f'<div class="block block--inline-blockwysiwyg {cls}">{markup}</div>'


def onecol(markup, anchor='', grey=False, vspace='large'):
    attrs = f' id="{anchor}"' if anchor else ''
    if grey:
        return (f'<div class="layout layout--onecol layout--narrow layout--vspace-{vspace} bg bg--light-grey bg--hub-geometric-topleft bg--padding-large bg--narrow" data-light=""{attrs}>'
                f'<div class="bg__sprites"><div class="bg__sprite bg__sprite--hub-geometric bg__sprite--1">{icon("hub-geometric", "0 0 719.5 718.4")}</div></div><div class="bg__content"><div class="layout__content">{markup}</div></div></div>')
    return f'<div class="layout layout--onecol layout--narrow layout--vspace-{vspace}"{attrs}><div class="layout__content">{markup}</div></div>'


def media_html(title, photo, alt, text, side='left'):
    return (f'<div class="block"><h2>{contrast(title)}</h2><div class="media-html media-html--{side}"><div class="layout-two-col layout-multi-column">'
            f'<div class="layout-multi-column__region layout-multi-column__region--33"><div class="responsive-image responsive-image--media-html-third"><img alt="{esc(alt)}" loading="lazy" src="{image(photo)}"></div></div>'
            f'<div class="layout-multi-column__region layout-multi-column__region--67">{wysiwyg(text)}</div></div></div></div>')


def twocol(left, right, anchor=''):
    attrs = f' id="{anchor}"' if anchor else ''
    return (f'<div class="layout layout--twocol layout--narrow layout--vspace-large"{attrs}><div class="layout__content"><div class="layout-two-col layout-multi-column">'
            f'<div class="layout-multi-column__region layout-multi-column__region--50"><div class="block">{left}</div></div>'
            f'<div class="layout-multi-column__region layout-multi-column__region--50"><div class="block">{right}</div></div></div></div></div>')


def vimeo(video, autoplay=False):
    return (f'<div class="media media--video media--video--full"><div class="eship-v6-video"><iframe src="https://player.vimeo.com/video/{video["id"]}?title=0&amp;byline=0&amp;portrait=0{"&amp;autoplay=1" if autoplay else ""}" '
            f'title="{esc(video["title"])}" loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div></div>')


def tiles(items, heading=''):
    tiles_markup = ''.join(
        f'<div class="grid__item"><a class="basic-tile" href="{url(href)}"><span class="basic-tile__primary-label text--weight-bold">{esc(primary)}</span><span class="basic-tile__secondary-label">{esc(secondary)}</span></a></div>'
        for primary, secondary, href in items)
    title = f'<h2 class="heading heading--medium heading--neutral">{esc(heading)}</h2>' if heading else ''
    return onecol(f'<div class="block">{title}<div class="grid grid--three-col">{tiles_markup}</div></div>')


def image_tiles(items):
    columns = ''.join(
        f'<div class="layout-multi-column__region layout-multi-column__region--33"><a class="navigation-tile-image" href="{url(href)}"><img alt="" class="navigation-tile-image__img" loading="lazy" src="{image(photo)}"><div class="navigation-tile-image__overlay"></div><div class="navigation-tile-image__title"><div class="wysiwyg">{esc(text)}</div></div></a></div>'
        for text, photo, href in items)
    return f'<div class="layout layout--threecol layout--vspace-large"><div class="layout__content"><div class="layout-three-col layout-multi-column">{columns}</div></div></div>'


def cards(items):
    markup = ''.join(
        f'<div class="cards-list__card"><div class="card"><div class="card__content"><div class="card__media"><img alt="" class="card__media-image" loading="lazy" src="{photo if photo.startswith("http") else image(photo)}"><span class="card__media-overlay card__media-overlay--standard"></span></div>'
        f'<div aria-hidden="true" class="card__text"><span class="card__title">{esc(title)}</span></div></div><a class="card__link" href="{url(href)}"><span class="visually-hidden">{esc(title)}</span></a></div></div>'
        for title, photo, href in items)
    return f'<div class="layout layout--onecol layout--vspace-small"><div class="layout__content"><div class="block block--inline-blocknews-collection"><div class="cards-list cards-list--collapsible"><div class="cards-list__featured cards-list__featured--{len(items)}">{markup}</div></div></div></div></div>'


def subheading(text):
    return f'<div class="layout layout--onecol layout--vspace-small"><div class="layout__content"><div class="block">{wysiwyg(f"<h2 class=heading--subtle>{esc(text)}</h2>")}</div></div></div>'


def course_id(course):
    return course['code'].lower().replace(' ', '-')


def course_item(course):
    cid = course_id(course)
    skills = ', '.join(course['skills'])
    extra = ''.join(
        f'<li class="course__additional-item"><div class="course__additional-label"><div class="wysiwyg">{label}</div></div><div class="course__additional-description"><div class="wysiwyg"><p>{esc(value)}</p></div></div></li>'
        for label, value in [('Prerequisite', course['prereq']), ('Key deliverable', course['keyDeliverable']), ('Skills', skills)])
    return (f'<li class="course-collection__item" id="{cid}"><div class="course"><div class="accordion accordion--borderless" data-interactive-component="">'
            f'<button aria-controls="{cid}-detail" aria-expanded="false" class="accordion__button"><span class="accordion__label"><span aria-hidden="true" class="course__condition"></span><abbr class="course__abbreviation">{esc(course["code"])}</abbr><span class="course__title">{esc(course["title"])}</span></span><span class="accordion__sprite">{icon("fas-chevron-down", "0 0 448 512")}</span></button>'
            f'<div class="accordion__expandable-content" id="{cid}-detail" style="height:0; overflow:hidden"><div class="course__content"><div class="course__first"><div class="course__credits">{course["credits"].split()[0]}</div><div class="course__credits-label">credits</div></div>'
            f'<div class="course__second"><div class="course__description"><div class="wysiwyg"><p><strong>{esc(course["stage"])}.</strong> {esc(course["subtitle"])}.</p><p>{esc(course["description"])}</p></div></div><ul class="course__additional-list">{extra}</ul></div></div></div></div></div></li>')


def course_list(courses, heading):
    return f'<div class="block--vspace-large block"><h3>{esc(heading)}</h3><div class="course-list-section"><div class="course-list-section__courses"><ul class="course-collection">{"".join(course_item(c) for c in courses)}</ul></div></div></div>'


def faculty_bios(people, photos=True):
    bios = []
    for person in people:
        focus = ''.join(f'<li class="bio__credential"><div class="credential"><div class="credential__icon"><span class="visually-hidden">Focus</span>{icon("fas-gear")}</div><div class="credential__text">{esc(item)}</div></div></li>' for item in person['focus'])
        photo = f'<img class="eship-v6-bio__photo" alt="Portrait of {esc(person["name"])}" loading="lazy" src="{image(person["image"])}">' if photos else ''
        bios.append(f'<li class="bio-collection__bio"><div class="bio eship-v6-bio">{photo}<div><div class="bio__title"><h4 class="heading">{esc(person["name"])}</h4><p class="eship-v6-bio__role">{esc(person["role"])} · {esc(person["office"])}</p></div>'
                    f'<ul class="bio__credentials">{focus}</ul><div class="bio__content"><div class="wysiwyg"><p>{esc(person["bio"])}</p><p><a href="mailto:{person["email"]}">{person["email"]}</a> · <a href="{person["directoryUrl"]}" target="_blank" rel="noopener noreferrer">Profile</a></p></div></div></div></div></li>')
    return f'<div class="block"><h3>Faculty</h3><ul class="bio-collection">{"".join(bios)}</ul></div>'


def steps(items, heading='Steps to Declare', intro_title='How to *Declare the Minor*', intro='', photo='/images/students-group.jpg', help_markup=''):
    rows = ''.join(
        f'<li class="how-to-apply__step"><div class="accordion" data-interactive-component=""><h4 class="accordion__heading heading heading--no-overline"><button aria-controls="step-{n}" aria-expanded="false" class="accordion__button"><span class="accordion__label accordion__label--label-underline"><span class="text--contrasting">{n}. </span>{esc(title)}</span><span class="accordion__sprite">{icon("fas-plus", "0 0 448 512")}</span></button></h4>'
        f'<div class="accordion__expandable-content accordion__expandable-content--indent-content" id="step-{n}" style="height:0; overflow:hidden"><div class="block">{wysiwyg(body)}</div></div></div></li>'
        for n, (title, body) in enumerate(items, 1))
    return (f'<div class="layout layout--how-to-apply layout--narrow layout--vspace-none bg bg--beaver-blue bg--hub-geometric-topright bg--padding-large bg--narrow" data-dark="" data-interactive-component=""><div class="bg__sprites"><div class="bg__sprite bg__sprite--hub-geometric bg__sprite--1">{icon("hub-geometric", "0 0 719.5 718.4")}</div></div>'
            f'<div class="bg__content"><div class="layout__content"><div class="how-to-apply"><div class="expandable-section" data-interactive-component="" id="how-to-apply"><div class="expandable-section__intro"><div class="layout__region layout__region--intro how-to-apply__intro"><div class="block"><div class="pd-intro">'
            f'<div class="pd-intro__first pd-intro__first--right pd-intro__first--media-html-half"><div class="responsive-image responsive-image--media-html-half"><img alt="" loading="lazy" src="{image(photo)}"></div></div>'
            f'<div class="pd-intro__second"><h2>{contrast(intro_title)}</h2>{wysiwyg(intro)}</div></div></div></div></div>'
            f'<button aria-controls="how-to-apply" aria-expanded="false" class="expandable-section__expand button--raised button button--expand-to-fit" type="button"><span class="button__label">{esc(heading)}</span><span class="button__icon">{icon("fas-chevron-down", "0 0 448 512")}</span></button>'
            f'<div class="expandable-section__content" style="height:0;overflow:hidden;"><div class="how-to-apply__more" data-light=""><div><h3 class="heading">{esc(heading)}</h3><ol class="how-to-apply__steps" role="list">{rows}</ol></div>'
            f'<div class="bg bg--light-grey bg--padding-small" data-light=""><div class="bg__content"><div class="how-to-apply__help"><div class="layout__region layout__region--help"><h3 class="heading">Advising <span class="text--contrasting">Help</span></h3><div class="block">{wysiwyg(help_markup)}</div></div></div></div></div></div></div>'
            f'<button aria-controls="how-to-apply" aria-expanded="false" class="expandable-section__collapse button--raised button button--expand-to-fit" type="button"><span class="button__label">Close {esc(heading)}</span><span class="button__icon">{icon("fas-chevron-up", "0 0 448 512")}</span></button></div></div></div></div></div>')


def bullets(items):
    return '<ul>' + ''.join(f'<li>{item}</li>' for item in items) + '</ul>'


SUBSCRIBE = f'''<form class="eship-subscribe eship-v6-subscribe" data-eship-subscribe action="https://lists.psu.edu/cgi-bin/wa" method="post" target="_blank" accept-charset="UTF-8"><input type="hidden" name="SUBED2" value="{LIST}"><input type="hidden" name="A" value="1"><input type="hidden" name="L" value="{LIST}"><input type="hidden" name="q" value=""><input type="hidden" name="t" value=""><input type="hidden" name="0" value=""><input type="hidden" name="b" value="Subscribe"><div class="eship-v6-subscribe__copy"><h2>Stay in the <span class="text--contrasting">E-SHIP Loop</span></h2><p>Course announcements, grant deadlines, treks, and events from the Penn State {LIST} mailing list. Use your Penn State email if you have one.</p></div><div class="eship-v6-form"><label>Full name<input name="p" autocomplete="name" required maxlength="100"></label><label>Penn State email<input name="s" type="email" autocomplete="email" inputmode="email" placeholder="abc1234@psu.edu" required maxlength="254"></label><button class="button" type="submit"><span class="button__label">Subscribe</span></button><p class="eship-v6-note">Opens Penn State LISTSERV in a new tab. Confirm from the email it sends to finish subscribing.</p><p role="status" data-eship-subscribe-status></p></div></form>'''

CONTACT_FORM = '''<form class="eship-v6-form eship-v6-contact" data-eship-contact><label>Your name<input name="name" autocomplete="name" required></label><label>Your email<input name="email" type="email" autocomplete="email" placeholder="abc1234@psu.edu" required></label><label>What would you like to discuss?<select name="topic"><option>Courses &amp; advising</option><option>Prototype grant</option><option>Global treks</option><option>Student ventures</option><option>Listserv access</option></select></label><label>Your message<textarea name="message" rows="5" required></textarea></label><button class="button" type="submit"><span class="button__label">Compose email</span></button><p class="eship-v6-note">Opens a draft in your email app. Send it there to contact the program.</p><p role="status" data-eship-contact-status></p></form>'''


def video_player(selected=0):
    videos = DATA['videos']
    first = videos[selected]
    thumbs = ''.join(
        f'<button type="button" class="eship-v6-thumb" data-eship-video="{v["id"]}" data-title="{esc(v["title"])}" data-category="{esc(v["category"])}" data-description="{esc(v["description"])}" data-creator="{esc(v["creator"])}" aria-pressed="{str(i == selected).lower()}">'
        f'<img alt="" loading="lazy" src="{v["thumbnail"]}"><span><small>{esc(v["category"])}</small>{esc(v["title"])}</span></button>'
        for i, v in enumerate(videos))
    return (f'<div class="eship-v6-player" data-eship-player>{vimeo(first)}<div class="eship-v6-player__meta"><p class="eship-v6-kicker" data-eship-player-category>{esc(first["category"])}</p><h3 data-eship-player-title>{esc(first["title"])}</h3>'
            f'<p data-eship-player-description>{esc(first["description"])}</p><p class="eship-v6-note">Produced by <span data-eship-player-creator>{esc(first["creator"])}</span></p></div><div class="eship-v6-thumbs">{thumbs}</div></div>')


# ---------------------------------------------------------------- shared copy
GRANT = ('<p>Do you have a project or technical concept that could become a real company? The Product Innovation Grant Program provides up to <strong>$500 per team</strong> in equity-free capital to cover essential early startup costs.</p>'
         + bullets(['Eligibility: enrolled in or completed ENGR 310', 'Non-dilutive micro-grant with rapid review turnaround'])
         + '<p>' + button('Apply via the grant form', 'https://pennstate.qualtrics.com/jfe/form/SV_2gdNylnJOKQFIBE') + '</p>')
CERTIFICATE = ('<p>A focused three-course, <strong>9-credit</strong> program designed to demonstrate your ability to innovate within engineering firms or launch independent ventures. Available to all undergraduate students at Penn State.</p>'
               + bullets(['Recorded officially on your Penn State academic transcript', 'Compatible with all College of Engineering departmental majors'])
               + '<p>' + read_more('Certificate requirements in the Penn State Bulletin', 'https://bulletins.psu.edu/undergraduate/colleges/engineering/product-innovation-entrepreneurship-certificate/#programrequirementstext') + '</p>')
ENTERN = ('<p>Real startups. Real experience. Real impact. E-SHIP matches students with early-stage ventures from Happy Valley LaunchBox FastTrack, Summer Founders, and Ben Franklin Technology Partners for a <strong>150-hour paid internship</strong>.</p>'
          + '<p>' + read_more('Ask about ENtern placements', 'contact') + '</p><p>' + read_more('Startups: submit a sponsor request', 'https://sites.psu.edu/entern/sponsor-submission-form/') + '</p>')
EVENTS = ('<p>Engage with founders, venture investors, and technology leaders right here in Happy Valley during Penn State Startup Week and E-SHIP events throughout the year.</p>'
          + '<p>' + read_more('Penn State Startup Week', 'https://startupweek.psu.edu/') + '</p>')
CLUSTER = [
    ('Hardware & Rapid Prototyping', 'Work directly inside the Penn State Learning Factory and the EDI Building Maker Commons. Students fabricate real mechanical assemblies, printed circuit boards (PCBs), firmware, and IoT devices.',
     ['Full CNC machining, 3D printing, and laser cutting', 'Embedded microcontrollers, sensors, and firmware', 'Direct access to EDI Building labs and tools']),
    ('Unit Economics & BOM Modeling', 'Understand how to scale an engineering product. Learn Bill of Materials (BOM) cost estimation, supply chain risk, contract manufacturer evaluation, and patent protection.',
     ['BOM and tooling cost projection', 'Contract manufacturing and vendor sourcing', 'Intellectual property and provisional patents']),
    ('ENTI Minor Credentials', 'Complete the 18-credit minor alongside any Penn State engineering major, including Mechanical, Electrical, Computer Science, Industrial, Biomedical, and Aerospace.',
     ['9 credits of core minor requirements', '9 credits in the Product Innovation Cluster', 'Stacks cleanly into standard four-year graduation plans']),
]
ADVISING = f'<p>Visit the E-SHIP office in the Engineering Design and Innovation (EDI) Building, Room 319, or email <a href="mailto:{EMAIL}">{EMAIL}</a>.</p><p>{read_more("Contact the E-SHIP team", "contact")}</p>'
RELATED = [('Curriculum', '6-course sequence', 'curriculum'), ('Grants and Certificate', 'Seed funding and credentials', 'program'), ('Global Treks', 'Asia and the United States', 'experiences'),
           ('GameDay Ventures', 'Student builds at Beaver Stadium', 'ventures'), ('Faculty', 'EDI Building, Room 319', 'faculty'), ('Newsroom', 'ENTI minor mailing list', 'newsroom')]


def related(exclude):
    return tiles([item for item in RELATED if item[2] != exclude][:3], 'Explore More of E-SHIP')


# ---------------------------------------------------------------- interior pages (program template)
def interior(slug, title_before, title, summary, tabs, photo, alt, sections, description, sticky_before=None):
    soup = BeautifulSoup((TEMPLATES / 'worldcampus-program.html').read_text(encoding='utf-8'), 'html.parser')
    shell(soup, slug, plain(f'{title_before} {title}'.strip()), description)
    # Drupal only ships the CSS each page needs; interior pages also use homepage components (cards).
    home = BeautifulSoup((TEMPLATES / 'worldcampus-home.html').read_text(encoding='utf-8'), 'html.parser')
    first = soup.head.find('link', rel='stylesheet')
    for sheet in home.head.find_all('link', rel='stylesheet'):
        if not soup.head.find('link', href=sheet['href']):
            first.insert_before(copy.copy(sheet))
    typography = soup.select_one('.page-title-typography__content')
    typography.clear()
    if title_before:
        typography.append(fragment(f'<span class="page-title-typography__subtitle-before">{esc(title_before)}</span>'))
    typography.append(fragment(f'<span class="page-title-typography__title">{esc(title)}</span>'))
    banner = soup.select_one('.page-title-banner-image__image')
    banner.clear()
    banner.append(fragment(f'<picture class="responsive-image responsive-image--title-banner"><img alt="{esc(alt)}" loading="eager" src="{image(photo)}"></picture>'))
    # The sticky bar mirrors the title and tab links once the reader scrolls past the banner.
    soup.select_one('.program-sticky-primary-content__program-degree').string = sticky_before or title_before or 'Engineering Entrepreneurship'
    soup.select_one('.program-sticky-primary-content__program-subject').string = title
    soup.select_one('.program-sticky-primary-content__program')['href'] = '#main-content'
    proxy = soup.select_one('.proxy-links')
    for link in proxy.select('a.proxy-links__link'):
        link.decompose()
    tab_links = soup.select_one('.tab-links')
    for link in tab_links.select('a.tab-links__link'):
        link.decompose()
    for text, anchor in reversed(tabs):
        proxy.insert(0, fragment(f'<a class="proxy-links__link" href="#{anchor}">{esc(text)}</a>'))
        tab_links.insert(0, fragment(f'<a class="tab-links__link" href="#{anchor}">{esc(text)}</a>'))
    for more in soup.select('.more-menu__list'):
        more.clear()
        more.append(fragment(''.join(f'<li class="more-menu__item"><a class="more-menu__link" href="{url(href)}">{esc(text)}</a></li>' for text, _, href in RELATED)))
    soup.select_one('.program-page-intro__summary').string = summary
    soup.select_one('#summary h2').string = 'Summary'
    article = soup.select_one('#block-worldcampus-content--2 article > div')
    article.clear()
    article.append(fragment(''.join(sections)))
    finalize(soup, slug)


def build_curriculum():
    courses = DATA['courses']
    cluster = ''.join(f'<h3>{esc(head)}</h3><p>{esc(text)}</p>{bullets(items)}' for head, text, items in CLUSTER)
    interior(
        'curriculum', 'Entrepreneurship and Innovation Minor', 'Product Innovation',
        'The Product Innovation Cluster of the Entrepreneurship and Innovation (ENTI) Minor is designed for engineering students who want to master product development, fabrication, and market entry, from first customer interview to investor pitch.',
        [('Summary', 'summary'), ('Courses', 'courses'), ('Cluster', 'cluster'), ('Declare', 'how-to-apply')],
        '/images/makerspace-students.jpg', 'Penn State engineering students working in a makerspace',
        [
            at_a_glance([('18 Credits', 'Six courses from MGMT 215 through ENGR 425, built to fit alongside any engineering major.'),
                         ('Top 50 Program', 'Ranked #23 in the nation and #5 in the Northeast by The Princeton Review and Entrepreneur Magazine.'),
                         ('Hands-On Builds', 'Prototype in the Learning Factory and EDI Maker Commons, then test with real users at Beaver Stadium.')]),
            disclosure('overview', 'Build Real Hardware. *Launch Tech Ventures.*',
                       '<p>E-SHIP is the College of Engineering\'s Product Innovation cluster at Penn State. We teach engineers to design physical hardware, calculate unit economics, build circuit prototypes, and bring technology products to commercial market.</p>',
                       wysiwyg('<p>The Entrepreneurship and Innovation Minor (ENTI) offers multiple tracks across Penn State. E-SHIP is the College of Engineering Product Innovation Cluster, administered by the School of Engineering Design and Innovation (SEDI).</p><p>You will learn to:</p>'
                               + bullets(['spot real market friction and validate customer problems', 'lead teams through high technical uncertainty', 'prototype, fabricate, and field-test physical products', 'model unit economics, BOM costs, and intellectual property', 'pitch investors and transition into an accelerator'])
                               + '<p>' + read_more('ENTI minor in the Penn State Bulletin', 'https://bulletins.psu.edu/undergraduate/colleges/intercollege/entrepreneurship-innovation-minor/') + '</p>'),
                       'Learn More About the Product Innovation Cluster'),
            disclosure('courses', 'Engineering Entrepreneurship *Courses*',
                       '<p>The six-course sequence moves from opportunity recognition to a capstone venture launch. Each course ends in a concrete deliverable, from a customer validation study to a formal investor pitch.</p>',
                       course_list(courses[:3], 'Foundation and Prototyping (9 credits)') + course_list(courses[3:], 'Commercialization and Launch (9 credits)')
                       + block(f'<h3>Course Availability</h3>{wysiwyg("<p>Course offerings vary by semester. Check LionPATH for the current schedule, or ask the E-SHIP team which sections fit your plan.</p>")}'),
                       'View Course List', grey=True),
            disclosure('cluster', 'The Product Innovation *Cluster Focus*',
                       '<p>Three focus areas set the cluster apart: hands-on fabrication, the economics of scaling a physical product, and a credential that stacks onto any engineering degree.</p>',
                       wysiwyg(cluster), 'Explore the Cluster Focus Areas'),
            steps([('Review the minor requirements.', '<p>Read the Entrepreneurship and Innovation Minor requirements and the Product Innovation Cluster course list in the Penn State Bulletin.</p><p>' + read_more('ENTI minor requirements', 'https://bulletins.psu.edu/undergraduate/colleges/intercollege/entrepreneurship-innovation-minor/') + '</p>'),
                   ('Talk with your academic adviser.', '<p>Plan how the 18 credits fit with your engineering major, and when to take the foundation and prototyping courses.</p>'),
                   ('Meet the E-SHIP team.', f'<p>Stop by EDI Building Room 319 or email <a href="mailto:{EMAIL}">{EMAIL}</a> to talk through courses, grants, and treks.</p>'),
                   ('Declare the minor in LionPATH.', '<p>Add the minor through LionPATH, then start with MGMT 215, open to all students with no prerequisites.</p>')],
                  intro='<p>The minor is open to Penn State undergraduates in any major and is designed for engineers who want to build and commercialize technology.</p>', help_markup=ADVISING),
            disclosure('faculty', 'Learn from *Builders*',
                       '<p>Courses are taught by engineering leaders and entrepreneurs who have built companies, patented hardware, and scaled products.</p>',
                       faculty_bios(DATA['faculty'], photos=False) + f'<p>{read_more("Meet the faculty", "faculty")}</p>', 'Meet the Faculty', grey=True),
            onecol(media_html('Ready to *Fund Your Prototype?*', '/images/hardware-collab.jpg', 'Students collaborating on a hardware prototype',
                              '<p>Apply for up to $500 in equity-free capital through the Product Innovation Grant.</p><p>' + button('Explore Grants and Programs', 'program') + '</p>'), vspace='none'),
            related('curriculum'),
        ],
        'The E-SHIP six-course sequence and Product Innovation Cluster of the Penn State Entrepreneurship and Innovation (ENTI) Minor.',
        sticky_before='ENTI Minor')


def build_program():
    interior(
        'program', 'Funding and Credentials', 'Grants, Certificate, and ENtern',
        'Beyond coursework, E-SHIP provides equity-free seed grants, a transcript credential, paid startup internships, and campus-wide events for Penn State engineering builders.',
        [('Summary', 'summary'), ('Grant', 'grant'), ('Certificate', 'certificate'), ('ENtern', 'entern'), ('Events', 'events')],
        '/images/hardware-collab.jpg', 'Students collaborating on a hardware build',
        [
            at_a_glance([('$500 Seed Grants', 'Equity-free funding per team to cover essential early startup costs.'),
                         ('9-Credit Certificate', 'A three-course credential recorded on your Penn State transcript.'),
                         ('150-Hour ENtern', 'Paid internships with early-stage ventures in Happy Valley and beyond.')]),
            disclosure('grant', 'The Product Innovation *Grant Program*', '<p>Up to $500 per team in non-dilutive capital, with a rapid review turnaround.</p>', wysiwyg(GRANT), 'Grant Eligibility and Application'),
            disclosure('certificate', 'Product Innovation *Entrepreneurship Certificate*', '<p>A focused three-course program available to all undergraduate students at Penn State.</p>', wysiwyg(CERTIFICATE), 'Certificate Details', grey=True),
            disclosure('entern', 'The ENtern *Entrepreneurship Intern* Program', '<p>E-SHIP matches students with early-stage ventures from Happy Valley LaunchBox FastTrack, Summer Founders, and Ben Franklin Technology Partners.</p>', wysiwyg(ENTERN), 'How ENtern Works'),
            disclosure('events', 'Penn State Startup Week and *Annual Events*', '<p>Meet founders, venture investors, and technology leaders without leaving Happy Valley.</p>', wysiwyg(EVENTS), 'Upcoming Events', grey=True),
            onecol(media_html('Questions About *Grant Eligibility?*', '/images/students-group.jpg', 'A group of E-SHIP students',
                              f'<p>Reach out directly to the E-SHIP team at <a href="mailto:{EMAIL}">{EMAIL}</a> or visit EDI Building Room 319.</p><p>' + button('Contact the E-SHIP Team', 'contact') + '</p>'), grey=True, vspace='none'),
            related('program'),
        ],
        'E-SHIP Product Innovation Grants, the Product Innovation Entrepreneurship Certificate, ENtern paid internships, and Penn State Startup Week.')


def build_experiences():
    sections = [at_a_glance([('Asia', 'Embedded study abroad in Seoul and a hardware supply-chain delegation in Taiwan.'),
                             ('United States', 'Venture capital in New York City and deep tech in Silicon Valley.'),
                             ('ENGR 411', 'The Korea trek is embedded in Business Basics for Entrepreneurs.')]),
                cards([(t['destination'], t['image'], f"experiences#{t['id']}") for t in DATA['treks']])]
    for index, trek in enumerate(DATA['treks']):
        more = wysiwyg(f'<p><strong>{esc(trek["destination"])} · {esc(trek["status"])}</strong></p><h3>Highlights</h3>' + bullets([esc(h) for h in trek['highlights']]))
        intro = f'<p><img class="eship-v6-inline-photo" alt="" loading="lazy" src="{image(trek["image"])}"></p><p>{esc(trek["summary"])}</p>'
        sections.append(disclosure(trek['id'], f'{TREK_NAMES[trek["id"]]} *{trek["type"]}*', intro, more, f'{trek["status"]} Trek Details', grey=index % 2 == 1))
    sections += [onecol(media_html('Travel with *E-SHIP*', '/images/korea-and-workshop-banner.png', 'Korea trek and workshop banner',
                                   '<p>Treks are announced on the ENTI minor mailing list, along with application deadlines and info sessions.</p><p>' + button('Subscribe in the Newsroom', 'newsroom') + '</p>'), vspace='none', grey=True),
                 related('experiences')]
    interior('experiences', 'Global Treks and', 'Experiences',
             'Study abroad in South Korea, join hardware delegations in Taiwan, meet venture capital firms in New York City, and explore deep tech in Silicon Valley.',
             [('Summary', 'summary')] + [(TREK_NAMES[t['id']], t['id']) for t in DATA['treks']],
             '/images/exp-seoul-1.jpg', 'E-SHIP students in Seoul, South Korea', sections,
             'E-SHIP global treks: Seoul, Taiwan, New York City, and Silicon Valley.')


def build_ventures():
    gameday = next(v for v in DATA['videos'] if v['id'] == '997986054')
    interior(
        'ventures', 'Field Prototyping and Community', 'GameDay Ventures and Builders',
        'Real hardware tested under game-day pressure. From Beaver Stadium tailgate playtests to national hackathons and venture-backed accelerators, E-SHIP engineering happens outside the lecture hall.',
        [('Summary', 'summary'), ('GameDay', 'gameday'), ('Whirl Pong', 'whirl-pong'), ('Builders', 'builders'), ('Video', 'video')],
        '/images/sedi-tailgate.jpg', 'Students testing tailgate games at Beaver Stadium',
        [
            at_a_glance([('ENGR 407', 'The flagship prototyping course behind GameDay Ventures.'), ('Beaver Stadium', 'Student teams test working prototypes with fans and judges.'), ('Spinouts', 'Projects like Whirl Pong continue as independent ventures.')]),
            disclosure('gameday', 'GameDay Ventures: *Beaver Stadium Tailgate Arena*',
                       '<p>The semester assignment: conceptualize, engineer, fabricate, and test an original physical tailgate game.</p>',
                       wysiwyg('<p>Student teams bring functional prototypes to Beaver Stadium lots, competing directly in front of fans and judges. It is the live user test that closes ENGR 407, Technology-Based Entrepreneurship.</p>' + f'<p>{read_more("See ENGR 407 in the curriculum", "curriculum#engr-407")}</p>'),
                       'How GameDay Works'),
            onecol(media_html('Case Study: *Whirl Pong*', '/images/sedi-tailgate.jpg', 'A tailgate game prototype',
                              '<p>Penn State mechanical engineering student Dillon Fink invented Whirl Pong during his E-SHIP coursework, reinventing the classic tailgate game with spinning target mechanics. The project spun out into an independent commercial venture.</p><p>'
                              + read_more('Read the Onward State story', 'https://onwardstate.com/2024/09/06/theres-nothing-like-it-out-there-penn-state-sophomore-reinvents-cup-pong/') + '</p>'), anchor='whirl-pong', grey=True),
            disclosure('builders', 'Penn State *Builders Collective*',
                       '<p>A high-velocity student organization uniting engineers, designers, and software builders.</p>',
                       wysiwyg('<p>Teams collaborate on national hackathons, hardware builds, and early startup launches with mentorship from E-SHIP faculty Ted Graef and Brad Groznik.</p>' + f'<p>{read_more("Visit psu.builders", "https://psu.builders")}</p>'),
                       'About the Builders Collective'),
            twocol(f'<h2>Watch GameDay <span class="text--contrasting">Ventures Live</span></h2>{wysiwyg("<p>Produced by Kintsugi Web Studio, see how student teams bring their physical games from the machine shop to the stadium lots.</p>")}', vimeo(gameday), anchor='video'),
            related('ventures'),
        ],
        'GameDay Ventures at Beaver Stadium, the Whirl Pong spinout, and the Penn State Builders Collective.')


def build_faculty():
    interior(
        'faculty', 'School of Engineering Design and Innovation', 'Faculty and Mentors',
        'Courses taught by engineering leaders and entrepreneurs who have built companies, patented hardware, and scaled products. Visit the E-SHIP office in the Engineering Design and Innovation (EDI) Building, Room 319.',
        [('Summary', 'summary'), ('Faculty', 'faculty'), ('Office Hours', 'office')],
        '/images/students-group.jpg', 'E-SHIP students and faculty',
        [
            onecol(faculty_bios(DATA['faculty']), anchor='faculty'),
            onecol(media_html('Visit Us in *EDI Building Room 319*', '/images/makerspace-students.jpg', 'Students in the EDI Building',
                              '<p>Have an idea for a hardware startup, want to declare the Product Innovation minor, or need guidance on your ENGR 407 tailgate build? Drop by Room 319 or book an advising session.</p><p>' + button('Contact Faculty', 'contact') + '</p>'), anchor='office', grey=True),
            related('faculty'),
        ],
        'Meet E-SHIP faculty Ted Graef and Brad Groznik in the Penn State EDI Building, Room 319.',
        sticky_before='E-SHIP')


def build_videos():
    interior(
        'videos', 'Program Videos', 'Watch E-SHIP',
        'See why engineers join E-SHIP, tour the Engineering Design and Innovation Building, and watch GameDay Ventures at Beaver Stadium.',
        [('Summary', 'summary'), ('Videos', 'videos')],
        '/images/makerspace-students.jpg', 'Students building prototypes',
        [onecol(f'<div class="block"><h2>Program <span class="text--contrasting">Videos</span></h2>{video_player()}</div>', anchor='videos'), related('videos')],
        'Program videos from Penn State Engineering Entrepreneurship.',
        sticky_before='E-SHIP')


def build_newsroom():
    news = (f'<section class="eship-news eship-v6-news" data-eship-news aria-live="polite" aria-busy="true"><div class="eship-v6-news__head"><h2>Latest from <span class="text--contrasting">the List</span></h2>'
            f'{read_more("Full archive", "https://lists.psu.edu/cgi-bin/wa?A0=" + LIST)}</div><ol class="eship-news-list" data-eship-news-list></ol><p class="eship-news-status" data-eship-news-status>Loading announcements…</p></section>')
    interior(
        'newsroom', 'Announcements from the ENTI Minor List', 'Newsroom',
        'Announcements from the Penn State ENTI minor mailing list: course registration notices, grant deadlines, trek announcements, and student venture showcases.',
        [('Summary', 'summary'), ('Subscribe', 'subscribe'), ('Announcements', 'announcements')],
        '/images/students-group.jpg', 'E-SHIP students',
        [onecol(f'<div class="block">{SUBSCRIBE}</div>', anchor='subscribe', grey=True), onecol(f'<div class="block">{news}</div>', anchor='announcements'), related('newsroom')],
        'E-SHIP newsroom: announcements from the Penn State ENTI minor mailing list.',
        sticky_before='E-SHIP')


def build_contact():
    info = (f'<h2>Engineering <span class="text--contrasting">Entrepreneurship</span></h2>' + wysiwyg(
        f'<p>School of Engineering Design and Innovation<br>Penn State College of Engineering</p><p>Engineering Design and Innovation Building<br>Room 319 · University Park, PA 16802</p>'
        f'<p><a href="mailto:{EMAIL}">{EMAIL}</a></p><p>{read_more("Meet your faculty", "faculty")}</p>'))
    interior(
        'contact', 'Connect and Advising', 'Contact E-SHIP',
        f'Connect with the E-SHIP program team at {EMAIL}, visit the Engineering Design and Innovation (EDI) Building Room 319, or subscribe to the Penn State ENTI listserv.',
        [('Summary', 'summary'), ('Contact', 'contact-form'), ('Subscribe', 'subscribe')],
        '/images/students-group.jpg', 'E-SHIP students',
        [twocol(info, CONTACT_FORM, anchor='contact-form'), onecol(f'<div class="block">{SUBSCRIBE}</div>', anchor='subscribe', grey=True), related('contact')],
        'Contact Penn State Engineering Entrepreneurship (E-SHIP).',
        sticky_before='E-SHIP')


# ---------------------------------------------------------------- home (edited in place)
def build_home():
    soup = BeautifulSoup((TEMPLATES / 'worldcampus-home.html').read_text(encoding='utf-8'), 'html.parser')
    shell(soup, '', 'Home', 'Penn State Engineering Entrepreneurship (E-SHIP): the College of Engineering Product Innovation cluster. Build real hardware, launch tech ventures, earn seed grants, and travel on global treks.')

    finder = soup.select_one('.degree-finder')
    finder.select_one('picture').replace_with(fragment(f'<picture class="responsive-image responsive-image--banner-16x9"><img alt="Penn State engineering students in a makerspace" loading="eager" src="{image("/images/makerspace-students.jpg")}"></picture>'))
    finder.select_one('h1').clear()
    finder.select_one('h1').append(fragment('Build Real Hardware. <span class="text--contrasting">Launch Tech Ventures.</span>'))
    content = finder.select_one('.degree-finder__content')
    content.clear()
    content.append(fragment('<p>E-SHIP is the College of Engineering\'s Product Innovation cluster at Penn State, ranked among the Top 50 undergraduate entrepreneurship programs.</p>'
                            f'<div class="eship-v6-hero-actions">{button("Explore the 6-Course Sequence", "curriculum")}{button("$500 Seed Grants", "program", alt=True)}</div>'))

    glance = soup.select('.at-a-glance-item')
    for item, (head, text) in zip(glance[:2], [('#23 in the Nation', 'Ranked #23 in the United States and #5 in the Northeast for undergraduate entrepreneurship by The Princeton Review.'),
                                                ('$500 Seed Grants', 'Equity-free funding per team, plus 150-hour paid ENtern internships with early-stage startups.')]):
        item.select_one('.at-a-glance-item__heading').clear()
        item.select_one('.at-a-glance-item__heading').append(fragment(f'<span class="at-a-glance-item__heading-text">{esc(head)}</span>'))
        item.select_one('.wysiwyg').clear()
        item.select_one('.wysiwyg').append(fragment(f'<p>{esc(text)}</p>'))
    badge = glance[2]
    badge.select_one('.at-a-glance-item__heading').clear()
    badge.select_one('.at-a-glance-item__heading').append(fragment('<span class="at-a-glance-item__heading-text">Nationally Recognized</span>'))
    badge_img = badge.select_one('img')
    badge_img.attrs = {'alt': 'The Princeton Review Top 50 Undergraduate Entrepreneurship Programs', 'loading': 'lazy', 'src': image('/images/princeton-review-ranking.png')}
    badge.select_one('.highlight__description .wysiwyg').clear()
    badge.select_one('.highlight__description .wysiwyg').append(fragment('Top 50 undergraduate entrepreneurship program, recognized by <em>The Princeton Review</em> and <em>Entrepreneur</em>.'))

    overview = DATA['videos'][0]
    story = soup.select_one('.story')
    story.select_one('.media').replace_with(fragment(vimeo(overview).replace('media--video--full"', 'media--video--full-width"')))
    quote = story.select_one('blockquote .wysiwyg')
    quote.clear()
    quote.append(fragment(esc(overview['description'])))
    story.select_one('figcaption').string = f'{overview["title"]}, {overview["creator"]}'
    story.select_one('.quote__after').clear()
    story.select_one('.quote__after').append(fragment(read_more('Watch more program videos', 'videos')))

    intro = soup.select_one('.block--inline-blockmedia-html')
    intro.select_one('h2').clear()
    intro.select_one('h2').append(fragment('Engineering Entrepreneurship <span class="text--contrasting">at Penn State</span>'))
    intro.select_one('img').attrs = {'alt': 'Students collaborating on a hardware prototype', 'loading': 'lazy', 'src': image('/images/hardware-collab.jpg')}
    intro.select_one('.wysiwyg').clear()
    intro.select_one('.wysiwyg').append(fragment('<p>We teach engineers to design physical hardware, calculate unit economics, build circuit prototypes, and bring technology products to commercial market. E-SHIP is the Product Innovation Cluster of the Entrepreneurship and Innovation (ENTI) Minor, administered by the School of Engineering Design and Innovation.</p>'
                                                 f'<p>{read_more("Explore the curriculum", "curriculum")}</p>'))
    soup.select_one('.block--program-history').decompose()

    columns = soup.select('.block--views-blockdegree-levels-homepage-levels .layout-multi-column__region--50')
    groups = [('Academic', 'Pathways', '/images/makerspace-students.jpg', [('6-Course Curriculum', 'curriculum#courses'), ('Product Innovation Cluster', 'curriculum#cluster'), ('Grants and Certificate', 'program')]),
              ('Experiences', 'Beyond the Classroom', '/images/taiwan-trip-1.jpg', [('Global Treks', 'experiences'), ('GameDay Ventures', 'ventures'), ('Faculty and Office Hours', 'faculty')])]
    for column, (strong, rest, photo, links) in zip(columns, groups):
        column.select_one('img').attrs = {'alt': '', 'loading': 'lazy', 'src': image(photo)}
        column.select_one('h3').clear()
        column.select_one('h3').append(fragment(f'<span class="text--contrasting">{esc(strong)}</span> {esc(rest)}'))
        for tile, (text, href) in zip(column.select('.navigation-tile'), links):
            tile.select_one('a')['href'] = url(href)
            tile.select_one('.visually-hidden').string = text
            title = tile.select_one('.navigation-tile__title')
            chevron = title.select_one('.navigation-tile__chevron')
            title.clear()
            title.append(text + ' ')
            title.append(chevron)

    topics = soup.select_one('.parallel-navigation')
    topics.select_one('.parallel-navigation__heading').string = 'Courses'
    items = topics.select('.parallel-navigation__item')
    icons = ['fas-magnifying-glass', 'fas-handshake-simple', 'fas-gear', 'fas-earth-americas', 'fas-building-user', 'fas-chalkboard-user']
    for item, course, name in zip(items, DATA['courses'], icons):
        item.select_one('a')['href'] = url(f'curriculum#{course_id(course)}')
        item.select_one('use')['xlink:href'] = f'#{name}'
        item.select_one('.parallel-navigation-item__title').string = f'{course["code"]}: {course["title"]}'
    for item in items[len(DATA['courses']):]:
        item.decompose()

    subheads = soup.select('h2.heading--subtle')
    subheads[0].string = 'Get Involved'
    subheads[1].string = 'Treks, Builds, and Stories'
    for tile, (text, photo, href) in zip(soup.select('a.navigation-tile-image'), [('Global Treks', '/images/exp-seoul-2.jpg', 'experiences'), ('GameDay Ventures', '/images/sedi-tailgate.jpg', 'ventures'), ('Builders Collective', '/images/students-group.jpg', 'ventures#builders')]):
        tile['href'] = url(href)
        tile.select_one('img').attrs = {'alt': '', 'class': 'navigation-tile-image__img', 'loading': 'lazy', 'src': image(photo)}
        tile.select_one('.wysiwyg').string = text
    stories = [(f'{DATA["treks"][0]["type"]}: {DATA["treks"][0]["destination"]}', DATA['treks'][0]['image'], 'experiences#korea'),
               (f'Inside the global hardware supply chain in {DATA["treks"][1]["destination"]}', DATA['treks'][1]['image'], 'experiences#taiwan'),
               (DATA['videos'][2]['title'], '/images/sedi-tailgate.jpg', 'ventures#video'),
               (DATA['videos'][1]['title'], '/images/makerspace-students.jpg', 'videos')]
    for card, (title, photo, href) in zip(soup.select('.cards-list__card'), stories):
        card.select_one('img').attrs = {'alt': '', 'class': 'card__media-image', 'loading': 'lazy', 'src': image(photo)}
        card.select_one('.card__title').string = title
        card.select_one('.card__link')['href'] = url(href)
        card.select_one('.card__link .visually-hidden').string = title
    more = soup.select_one('p.text-align-right')
    more.clear()
    more.append(fragment(f'<strong>{read_more("Read the E-SHIP newsroom", "newsroom")}</strong>'))
    more.find_parent(class_='layout').insert_after(fragment(onecol(f'<div class="block">{SUBSCRIBE}</div>', grey=True)))

    overlay = soup.select_one('.overlay')
    overlay.select_one('picture').replace_with(fragment(f'<picture class="responsive-image responsive-image--feature-banner"><img alt="" loading="lazy" src="{image("/images/taiwan-trip-2.jpg")}"></picture>'))
    overlay.select_one('h2').clear()
    overlay.select_one('h2').append(fragment('Made at Penn State <em>Engineering</em>'))
    overlay.select_one('.wysiwyg').clear()
    overlay.select_one('.wysiwyg').append(fragment('<p>E-SHIP courses are taught by engineers and founders who have built companies, patented hardware, and scaled products. Find us in the Engineering Design and Innovation Building, Room 319.</p>'
                                                   f'<p>{button("Contact E-SHIP", "contact", alt=True)}</p>'))
    finalize(soup, '')


def prune():
    """Deletes mirrored World Campus assets the generated pages no longer reference (mostly their photos).
    Rerun scripts/mirror-worldcampus.mjs first if a later change needs one back."""
    mirror = OUT / 'wc'
    used = set()
    pending = [path for path in OUT.rglob('*.html')] + [OUT / 'v6.css']
    while pending:
        text = pending.pop().read_text(encoding='utf-8', errors='ignore')
        for ref in re.findall(r'/versions/v6/wc/[^"\')\s,?]+', text):
            path = PUBLIC / ref.lstrip('/')
            if path not in used:
                used.add(path)
                if path.suffix == '.css' and path.exists():
                    pending.append(path)
    removed = 0
    for path in mirror.rglob('*'):
        if path.is_file() and path not in used:
            path.unlink()
            removed += 1
    for folder in sorted((p for p in mirror.rglob('*') if p.is_dir()), key=lambda p: len(p.parts), reverse=True):
        if not any(folder.iterdir()):
            folder.rmdir()
    print(f'pruned {removed} unused mirror assets')


if __name__ == '__main__':
    for build in [build_home, build_curriculum, build_program, build_experiences, build_ventures, build_faculty, build_videos, build_newsroom, build_contact]:
        build()
    prune()
