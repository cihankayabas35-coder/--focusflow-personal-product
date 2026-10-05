const taskList=document.getElementById('taskList');
let tasks=JSON.parse(localStorage.getItem('focusflow_tasks')||'[]');
const note=document.getElementById('note');
note.value=localStorage.getItem('focusflow_note')||'';
document.getElementById('date').textContent=new Date().toLocaleDateString(undefined,{weekday:'long',month:'short',day:'numeric'});
function save(){localStorage.setItem('focusflow_tasks',JSON.stringify(tasks));render()}
function render(){
 taskList.innerHTML='';
 if(!tasks.length){taskList.innerHTML='<li class="empty">No tasks yet. Add your first priority.</li>'}
 tasks.forEach((t,i)=>{
  const li=document.createElement('li');li.className='task'+(t.done?' completed':'');
  li.innerHTML=`<input type="checkbox" ${t.done?'checked':''} aria-label="Complete task"><label></label><button class="delete" aria-label="Delete task">✕</button>`;
  li.querySelector('label').textContent=t.text;
  li.querySelector('input').onchange=()=>{tasks[i].done=!tasks[i].done;save()};
  li.querySelector('.delete').onclick=()=>{tasks.splice(i,1);save()};
  taskList.appendChild(li);
 });
 const done=tasks.filter(t=>t.done).length;
 document.getElementById('total').textContent=tasks.length;
 document.getElementById('done').textContent=done;
 document.getElementById('progress').textContent=(tasks.length?Math.round(done/tasks.length*100):0)+'%';
}
document.getElementById('taskForm').onsubmit=e=>{e.preventDefault();const input=document.getElementById('taskInput');tasks.push({text:input.value.trim(),done:false});input.value='';save()};
document.getElementById('clearDone').onclick=()=>{tasks=tasks.filter(t=>!t.done);save()};
document.getElementById('saveNote').onclick=()=>{localStorage.setItem('focusflow_note',note.value);document.getElementById('saved').textContent='Saved ✓';setTimeout(()=>document.getElementById('saved').textContent='',1500)};
render();
