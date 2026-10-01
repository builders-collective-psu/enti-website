const topics=new Set(['Minor advising','Courses & enrollment','Taiwan & global experiences','Partnerships & projects','Something else']);
const attempts=new Map();
export default async function handler(req,res){
res.setHeader('Cache-Control','no-store');const configured=Boolean(process.env.RESEND_API_KEY&&process.env.CONTACT_FROM&&process.env.CONTACT_ALLOWED_ORIGIN);
if(req.method==='GET')return res.status(200).json({configured});
if(req.method!=='POST'){res.setHeader('Allow','GET, POST');return res.status(405).json({error:'Method not allowed.'});}
if(!configured)return res.status(503).json({error:'Email delivery is not configured. Please use the email draft.'});
if(req.headers.origin!==process.env.CONTACT_ALLOWED_ORIGIN)return res.status(403).json({error:'This request cannot be accepted.'});
if(!String(req.headers['content-type']||'').startsWith('application/json'))return res.status(415).json({error:'Use a JSON request.'});
const ip=String(req.headers['x-forwarded-for']||req.socket?.remoteAddress||'unknown').split(',')[0];const now=Date.now();for(const [key,value] of attempts)if(now-value.start>60000)attempts.delete(key);const attempt=attempts.get(ip)||{start:now,count:0};attempt.count++;attempts.set(ip,attempt);if(attempt.count>4){res.setHeader('Retry-After','60');return res.status(429).json({error:'Please wait a minute and try again.'});}
const data=req.body;if(!data||typeof data!=='object'||Array.isArray(data))return res.status(400).json({error:'Please check your details.'});
const {name,email,topic,message,major='',website=''}=data;
if(website||typeof name!=='string'||name.trim().length<1||name.length>100||typeof email!=='string'||email.length>254||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||!topics.has(topic)||typeof message!=='string'||message.trim().length<10||message.length>4000||typeof major!=='string'||major.length>120)return res.status(400).json({error:'Please check your details and include a message of 10–4,000 characters.'});
const to=topic==='Courses & enrollment'?'btg125@psu.edu':'jtg150@psu.edu';
try{const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+process.env.RESEND_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({from:process.env.CONTACT_FROM,to:[to],reply_to:email,subject:'E-SHIP inquiry: '+topic,text:message.trim()+'\n\nName: '+name.trim()+'\nEmail: '+email+'\nMajor / organization: '+major+'\nTopic: '+topic}),signal:AbortSignal.timeout(10000)});if(!response.ok)return res.status(502).json({error:'Email delivery failed. Please use the email draft.'});return res.status(200).json({sent:true});}catch{return res.status(502).json({error:'Email delivery failed. Please use the email draft.'});}}
