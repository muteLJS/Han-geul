#!/usr/bin/env bun
const channel = process.argv[2] || '7j283hxr';
const command = process.argv[3] || 'get_document_info';
let params = {};
try { params = process.argv[4] ? JSON.parse(process.argv[4]) : {}; } catch (e) { console.error('Invalid JSON params', e); process.exit(2); }
const id = `cmd-${Date.now()}-${Math.random().toString(16).slice(2)}`;
const ws = new WebSocket('ws://localhost:3055');
let sent = false;
let timer;
function done(code){ clearTimeout(timer); try{ ws.close(); }catch{} process.exit(code); }
ws.onopen = () => ws.send(JSON.stringify({ id: id+'-join', type:'join', channel, message:{ id:id+'-join', command:'join', params:{ channel } } }));
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (!sent && data.channel === channel && data.type === 'system' && JSON.stringify(data.message).includes('Connected to channel')) {
    sent = true;
    ws.send(JSON.stringify({ id, type:'message', channel, message:{ id, command, params:{ ...params, commandId:id } } }));
    return;
  }
  const msg = data.message;
  if (msg && msg.id === id && (msg.result !== undefined || msg.error !== undefined)) {
    console.log(JSON.stringify(msg, null, 2));
    done(msg.error ? 2 : 0);
  }
};
ws.onerror = (e) => { console.error('WS error', e.message || e); done(1); };
timer = setTimeout(() => { console.error('TIMEOUT waiting for', command); done(124); }, 30000);
