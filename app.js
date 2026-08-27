const FAMILIES = [
  {id:'effect',name:'Efecto del ataque',color:'#825cff'},
  {id:'access',name:'Conocimiento y objetivo',color:'#ff641c'},
  {id:'pipeline',name:'Pipeline y alcance',color:'#ff2e93'},
  {id:'vision',name:'Visión y biometría',color:'#9a6cff'},
  {id:'sensors',name:'Sensores y vigilancia',color:'#ff7a32'},
  {id:'cross',name:'Cruces metodológicos',color:'#f43ba8'}
];
const LEVELS = [
  {id:1,name:'Dominio'},
  {id:2,name:'Eje de clasificación'},
  {id:3,name:'Concepto / tecnología'},
  {id:4,name:'Método / familia de ataque'},
  {id:5,name:'Artefacto / implementación / recurso'}
];

const N = (id,label,family,intro,tags=[],sources=[]) => ({id,label,family,intro,tags,sources});
const nodes = [
  N('atlas','Jardín adversarial','cross','Punto de entrada a una taxonomía relacional: cada técnica puede leerse por efecto, acceso, momento, soporte y sistema.',['mapa','taxonomía']),
  N('vanishing','Vanishing','effect','Suprime detecciones reales: el modelo deja de ver objetos presentes. En TOG minimiza la confianza de objeto.',['TOG','L_obj','supresión'],[['Paper TOG','https://arxiv.org/abs/2007.05828'],['Repositorio TOG','https://github.com/git-disl/TOG']]),
  N('fabrication','Fabrication','effect','Fabrica falsos positivos en regiones vacías y puede saturar la salida del detector.',['TOG','falsos positivos'],[['Paper TOG','https://arxiv.org/abs/2007.05828']]),
  N('mislabeling','Mislabeling','effect','Conserva una detección, pero busca que el detector asigne una clase incorrecta.',['TOG','clasificación','targeted'],[['Paper TOG','https://arxiv.org/abs/2007.05828']]),
  N('untargeted','Untargeted','effect','Busca provocar un error sin fijar de antemano una salida adversarial concreta.',['FGSM','PGD','C&W'],[['Carlini & Wagner','https://arxiv.org/abs/1608.04644']]),
  N('whitebox','White-box','access','Supuesto en el que el atacante dispone de información interna suficiente para calcular gradientes exactos del modelo objetivo.',['acceso interno','gradientes'],[['Papernot et al. 2017','https://arxiv.org/abs/1602.02697']]),
  N('graybox','Gray-box','access','Etiqueta de uso variable en la literatura: aquí indica conocimiento o acceso parcial al modelo, situado entre los supuestos white-box y black-box.',['acceso parcial','terminología variable']),
  N('blackbox','Black-box','access','Opera mediante entradas y salidas; puede usar consultas, transferencia o modelos sustitutos.',['query access','transferencia'],[['Papernot et al. 2017','https://arxiv.org/abs/1602.02697']]),
  N('targeted','Targeted','access','Persigue una salida adversarial previamente especificada, por ejemplo una clase objetivo.',['objetivo específico'],[['Carlini & Wagner','https://arxiv.org/abs/1608.04644']]),
  N('evasion','Evasion','pipeline','Manipula la entrada durante la inferencia para provocar un fallo en un modelo ya entrenado.',['inferencia'],[['SoK: Security and Privacy in Machine Learning','https://arxiv.org/abs/1611.03814']]),
  N('poisoning','Poisoning','pipeline','Introduce influencia maliciosa en los datos o el proceso de entrenamiento para alterar el modelo resultante.',['entrenamiento'],[['SoK: Security and Privacy in Machine Learning','https://arxiv.org/abs/1611.03814']]),
  N('extraction','Extraction','pipeline','Busca aproximar funcionalidad, decisiones o parámetros de un modelo mediante consultas a su interfaz.',['API','consultas'],[['Model Extraction Attacks','https://www.usenix.org/conference/usenixsecurity16/technical-sessions/presentation/tramer']]),
  N('norms','Normas L₀ · L₂ · L∞','pipeline','Tres maneras de acotar una perturbación: cantidad de píxeles, magnitud euclidiana o cambio máximo por píxel.',['L0','L2','L∞'],[['Carlini & Wagner','https://arxiv.org/abs/1608.04644']]),
  N('physical','Realizable físicamente','cross','Perturbación diseñada y evaluada para conservar efecto bajo transformaciones del mundo físico, como impresión, iluminación, distancia, ángulo o captura. No implica eficacia garantizada fuera de las condiciones probadas.',['mundo físico','robustez'],[['Synthesizing Robust Adversarial Examples','https://arxiv.org/abs/1707.07397']]),
  N('eot','EOT','cross','Expectation over Transformation optimiza sobre una distribución de transformaciones para obtener robustez física.',['rotación','luz','distancia'],[['Athalye et al.','https://arxiv.org/abs/1707.07397']]),
  N('universal','Universal','pipeline','Una misma perturbación se diseña para afectar múltiples entradas de una distribución, en lugar de optimizarse para una sola muestra.',['reutilizable'],[['Universal Adversarial Perturbations','https://arxiv.org/abs/1610.08401']]),
  N('instance','Per-instance','pipeline','Cada muestra requiere una perturbación optimizada específicamente para ella.',['optimización individual']),
  N('dual','Dual-use','cross','Categoría analítica de este jardín: una técnica puede investigarse para evaluar robustez o proteger privacidad, pero también utilizarse para evasión. Su valoración depende del contexto, propósito y marco jurídico.',['categoría analítica','ética','contexto']),
  N('patch','Adversarial Patch','cross','Familia de ataques que concentra la perturbación en una región. Puede ser digital, física, universal, vestible, naturalista o colocarse sobre el sensor.',['patch','físico','universal'],[['Brown et al.','https://arxiv.org/abs/1712.09665']]),
  N('yolo','YOLO · SSD · RT-DETR','vision','Detectores objetivo de una etapa o basados en transformers. No son ataques: son modelos cuya robustez se evalúa.',['detección','modelos objetivo'],[['RT-DETR','https://arxiv.org/abs/2304.08069']]),
  N('twostage','Faster / Mask R-CNN','vision','Detectores de dos etapas: primero proponen regiones y después las clasifican; Mask R-CNN añade siluetas.',['dos etapas','segmentación'],[['Faster R-CNN','https://arxiv.org/abs/1506.01497'],['Mask R-CNN','https://arxiv.org/abs/1703.06870']]),
  N('openvocab','Vocabulario abierto','vision','Grounding DINO y YOLO-World permiten detección condicionada por lenguaje; YOLOE admite prompts textuales y visuales, además de un modo sin prompt.',['texto','prompts','open vocabulary'],[['Grounding DINO','https://arxiv.org/abs/2303.05499'],['YOLO-World','https://arxiv.org/abs/2401.17270'],['YOLOE','https://arxiv.org/abs/2503.07465']]),
  N('face_det','Detección facial','vision','MTCNN, RetinaFace, SCRFD y YuNet localizan rostro y, según el modelo, landmarks.',['rostro','landmarks'],[['RetinaFace','https://arxiv.org/abs/1905.00641']]),
  N('face_id','Identidad facial','vision','ArcFace, FaceNet y CosFace producen embeddings para comparar o reconocer identidades; no son detectores.',['embeddings','reconocimiento'],[['ArcFace','https://arxiv.org/abs/1801.07698'],['FaceNet','https://arxiv.org/abs/1503.03832']]),
  N('tracking','Tracking','vision','ByteTrack, DeepSORT y BoT-SORT siguen objetos ya detectados a través del tiempo.',['temporal','trayectorias'],[['ByteTrack','https://arxiv.org/abs/2110.06864'],['Deep SORT','https://arxiv.org/abs/1703.07402']]),
  N('audio','Audio y voz','sensors','VAD y keyword spotting detectan actividad o eventos de voz; ASR transcribe; los sistemas de reconocimiento de hablante comparan representaciones vocales.',['Whisper','ECAPA-TDNN','VAD'],[['Whisper','https://arxiv.org/abs/2212.04356'],['ECAPA-TDNN','https://arxiv.org/abs/2005.07143']]),
  N('rgb','Cámara RGB','sensors','Superficie visual habitual en CCTV, webcam y cámaras corporales. Los patrones impresos actúan en luz visible.',['CCTV','visible']),
  N('nir','RGB–NIR / nocturna','sensors','Agrupa sistemas que combinan canales visibles y NIR, o que iluminan la escena con infrarrojo cercano durante la noche. Son configuraciones distintas; un resultado obtenido en RGB no demuestra transferencia a NIR.',['infrarrojo cercano','noche']),
  N('thermal','Cámara térmica','sensors','Registra radiación infrarroja térmica y contraste de temperatura. Los ataques físicos estudiados para esta modalidad manipulan la distribución térmica, por lo que un patrón RGB no es equivalente.',['infrarrojo térmico','multiespectral'],[['Parches infrarrojos físicos','https://arxiv.org/abs/2303.13868']]),
  N('depth','Profundidad / ToF','sensors','Estima estructura 3D y distancia mediante una modalidad de profundidad. La superficie de ataque y su viabilidad dependen del principio de medición y del modelo evaluado.',['3D','ToF','RGB-D'],[['Robustez de detección 3D por cámara','https://arxiv.org/abs/2301.10766']]),
  N('lidar','LiDAR','sensors','Produce nubes de puntos 3D procesadas por detectores especializados. Debe distinguirse entre perturbaciones digitales de puntos y objetos físicamente realizables.',['nube de puntos','geometría'],[['Ejemplos físicos para detección LiDAR','https://arxiv.org/abs/2004.00543']]),
  N('alpr','ALPR / LPR','sensors','Sistema para localizar y leer matrículas. Como abstracción experimental puede separarse en captura, localización de placa y reconocimiento de caracteres, aunque los productos propietarios no necesariamente publican esa arquitectura.',['matrículas','OCR','abstracción metodológica']),
  N('flock','Flock LPR / NightVision','cross','Caso integrado de vigilancia vial propietaria: la documentación oficial describe captura de matrículas y atributos del vehículo, además de iluminación infrarroja nocturna. Como no identifica públicamente una arquitectura neuronal concreta, una evaluación académica prudente separaría captura, lectura de placa y atributos; usaría sustitutos, transformaciones físicas y medición de transferencia sin afirmar eficacia directa.',['LPR','OCR','infrarrojo','propietario','transferencia'],[['Producto LPR de Flock','https://www.flocksafety.com/products/license-plate-readers'],['FAQ oficial de Flock','https://www.flocksafety.com/faq']]),
  N('transfer','Transferencia','cross','Evalúa si un ataque creado contra modelos sustitutos conserva eficacia en un sistema objetivo desconocido.',['surrogates','black-box']),
  N('multimodal','Evaluación multimodal','cross','Categoría metodológica de este jardín para estudiar conjuntamente superficies visuales, acústicas, temporales o de sensores. No designa por sí sola un algoritmo de ataque específico.',['categoría metodológica','audio','video','sensores']),
  N('tog','TOG','effect','Framework que formaliza ataques vanishing, fabrication, mislabeling y untargeted sobre detectores de objetos.',['paper','repositorio'],[['Repositorio oficial','https://github.com/git-disl/TOG']]),
  N('dpatch','DPatch','effect','Método de parche contra detectores que admite ataques dirigidos y no dirigidos y estudia transferencia entre Faster R-CNN y YOLO.',['patch','detector'],[['Paper DPatch','https://arxiv.org/abs/1806.02299']]),
  N('pgd','PGD / FGSM','pipeline','Métodos iterativo y de un paso basados en gradiente, usados como referencias de perturbación acotada.',['gradiente','baseline'],[['FGSM','https://arxiv.org/abs/1412.6572'],['PGD','https://arxiv.org/abs/1706.06083']]),
  N('advshirt','Adversarial T-shirt','cross','Artefacto físico vestible orientado a suprimir la detección de personas bajo deformación, pose y cambios de captura.',['wearable','persona'],[['Paper Adversarial T-shirt','https://arxiv.org/abs/1910.11099']]),
  N('advhat','AdvHat','vision','Ataque físico mediante un patrón impreso colocado en un sombrero, evaluado contra un sistema de identificación facial basado en ArcFace.',['rostro','identificación','físico'],[['Paper AdvHat','https://arxiv.org/abs/1908.08705']]),
  N('rp2','RP2','cross','Robust Physical Perturbations optimiza señales adversariales para sobrevivir variaciones físicas, inicialmente sobre señales de tránsito.',['físico','EOT','señales'],[['Paper RP2','https://arxiv.org/abs/1707.08945']]),
  N('objecthider','Object Hider','effect','Método de parche para ocultar objetos frente a detectores mediante dos variantes de generación: una basada en mapas de activación y otra en consenso.',['vanishing','patch','transferencia'],[['Paper Object Hider','https://arxiv.org/abs/2010.14974'],['Repositorio','https://github.com/FenHua/DetDak']]),
  N('translucent','Translucent Patch','sensors','Parche universal translúcido situado sobre la lente: ataca la captura sin modificar directamente el objeto.',['lente','contactless','universal'],[['Paper Translucent Patch','https://arxiv.org/abs/2012.12528']]),
  N('dap','DAP dinámico','cross','Parche dinámico y naturalista para evadir detectores de personas, diseñado para transformaciones y deformaciones no rígidas.',['naturalista','persona','físico'],[['Paper DAP','https://arxiv.org/abs/2305.11618']]),
  N('badpatch','BadPatch','cross','Generación de parches físicos naturalistas mediante difusión, con evaluación sobre múltiples familias de detectores.',['difusión','naturalista','patch'],[['Paper BadPatch','https://arxiv.org/abs/2412.01440']])
];

// Cinco capas de lectura. Los nodos no dependen de su posición visual para expresar jerarquía.
const level1 = new Set(['atlas']);
const level3 = new Set(['vanishing','fabrication','mislabeling','untargeted','whitebox','graybox','blackbox','targeted','evasion','poisoning','extraction','norms','physical','universal','instance','dual','yolo','twostage','openvocab','face_det','face_id','tracking','audio','rgb','nir','thermal','depth','lidar','alpr','transfer','multimodal']);
const level5 = new Set(['advshirt','advhat','rp2','objecthider','translucent','dap','badpatch']);
nodes.forEach(n=>n.level=level1.has(n.id)?1:(level3.has(n.id)?3:(level5.has(n.id)?5:4)));

// Los seis ejes también funcionan como nodos de segundo nivel y articulan sus familias.
FAMILIES.forEach(f=>{const axis=N(`axis_${f.id}`,f.name,f.id,`Eje de lectura que reúne los nodos de ${f.name.toLowerCase()} y conserva sus relaciones con otras capas.`,['nivel 2','eje']);axis.level=2;nodes.push(axis);});

const edgePairs = [
 ['atlas','vanishing'],['atlas','blackbox'],['atlas','evasion'],['atlas','physical'],['atlas','yolo'],['atlas','rgb'],['atlas','dual'],
 ['vanishing','yolo'],['vanishing','face_det'],['vanishing','tracking'],['vanishing','patch'],['fabrication','yolo'],['mislabeling','targeted'],['mislabeling','face_id'],['untargeted','evasion'],['untargeted','norms'],
 ['whitebox','norms'],['whitebox','eot'],['graybox','transfer'],['blackbox','transfer'],['blackbox','extraction'],['targeted','patch'],
 ['evasion','patch'],['evasion','physical'],['poisoning','dual'],['extraction','blackbox'],['norms','instance'],['norms','universal'],
 ['physical','eot'],['physical','patch'],['physical','rgb'],['eot','patch'],['eot','nir'],['eot','alpr'],['universal','patch'],['universal','transfer'],['dual','flock'],
 ['patch','yolo'],['patch','face_det'],['patch','rgb'],['patch','nir'],['yolo','twostage'],['yolo','openvocab'],['yolo','tracking'],['yolo','rgb'],['twostage','thermal'],
 ['face_det','face_id'],['face_det','rgb'],['face_det','nir'],['face_id','tracking'],['tracking','multimodal'],['tracking','rgb'],
 ['audio','multimodal'],['rgb','nir'],['nir','thermal'],['thermal','depth'],['depth','lidar'],['alpr','nir'],['alpr','flock'],['flock','transfer'],['flock','blackbox'],['flock','eot'],['flock','dual'],['flock','nir'],['transfer','eot'],['multimodal','dual'],
 ['tog','vanishing'],['tog','fabrication'],['tog','mislabeling'],['tog','untargeted'],['dpatch','patch'],['dpatch','vanishing'],['pgd','norms'],['pgd','untargeted'],['advshirt','patch'],['advshirt','physical'],['advshirt','vanishing'],['advhat','face_id'],['advhat','physical'],['rp2','patch'],['rp2','eot'],['objecthider','patch'],['objecthider','vanishing'],['translucent','patch'],['translucent','rgb'],['dap','patch'],['dap','physical'],['badpatch','patch'],['badpatch','yolo']
];
FAMILIES.forEach(f=>{
  edgePairs.push(['atlas',`axis_${f.id}`]);
  nodes.filter(n=>n.family===f.id&&n.level===3).forEach(n=>edgePairs.push([`axis_${f.id}`,n.id]));
});

const byId = Object.fromEntries(nodes.map(n=>[n.id,n]));
const family = id => FAMILIES.find(f=>f.id===id);
const connections = id => edgePairs.filter(e=>e.includes(id)).map(e=>byId[e[0]===id?e[1]:e[0]]);
const canvas=document.querySelector('#graph'),ctx=canvas.getContext('2d'),shell=canvas.parentElement;
let W=0,H=0,dpr=1,hover=null,selected=null,activeFamily='all',maxLevel=5,query='',drag=false,movedDuringDrag=false,last={x:0,y:0},camera={x:0,y:0,z:1};

function seedLayout(){
  const groups={}; FAMILIES.forEach((f,i)=>groups[f.id]={cx:Math.cos(i*Math.PI/3-.8)*330,cy:Math.sin(i*Math.PI/3-.8)*270,items:[]});
  nodes.forEach(n=>groups[n.family].items.push(n));
  Object.values(groups).forEach(g=>g.items.forEach((n,i)=>{if(n.level===2){n.x=g.cx;n.y=g.cy;return;}const a=i/g.items.length*Math.PI*2;const radius=n.level===3?100:(n.level===4?158:210);n.x=g.cx+Math.cos(a)*(radius+14*(i%3));n.y=g.cy+Math.sin(a)*(radius*.75+11*((i+1)%3));}));
  byId.atlas.x=0;byId.atlas.y=0;
}
function resize(){dpr=Math.min(devicePixelRatio||1,2);W=shell.clientWidth;H=shell.clientHeight;canvas.width=W*dpr;canvas.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);draw();}
const screen=n=>({x:W/2+camera.x+n.x*camera.z,y:H/2+camera.y+n.y*camera.z});
const visible=n=>n.level<=maxLevel&&(activeFamily==='all'||n.family===activeFamily||n.id==='atlas')&&(!query||(`${n.label} ${n.intro} ${n.tags.join(' ')}`).toLowerCase().includes(query));
function draw(){
  ctx.clearRect(0,0,W,H);ctx.save();
  const related=selected?new Set([selected.id,...connections(selected.id).map(n=>n.id)]):null;
  edgePairs.forEach(([a,b],i)=>{const A=byId[a],B=byId[b],va=visible(A),vb=visible(B);if(!va||!vb)return;const p=screen(A),q=screen(B),highlight=selected&&(a===selected.id||b===selected.id);ctx.beginPath();ctx.moveTo(p.x,p.y);const bend=((i%5)-2)*8*camera.z;ctx.quadraticCurveTo((p.x+q.x)/2+bend,(p.y+q.y)/2-bend,q.x,q.y);ctx.strokeStyle=highlight?family(selected.family).color:(A.family===B.family?family(A.family).color:'#5c526e');ctx.globalAlpha=selected?(highlight?.98:.07):.3;ctx.lineWidth=(highlight?2.2:.7)*Math.max(.7,camera.z);ctx.stroke();});
  ctx.globalAlpha=1;
  nodes.filter(visible).forEach(n=>{const p=screen(n),f=family(n.family),is=n===selected||n===hover,isRelated=!related||related.has(n.id),base=[0,10,7,5.2,4.1,3.2][n.level],r=base*Math.max(.75,Math.min(camera.z,1.35));ctx.globalAlpha=isRelated?1:.15;if(is||n.level<=2){ctx.beginPath();ctx.arc(p.x,p.y,r+(n.level===2?10:12),0,Math.PI*2);ctx.strokeStyle=f.color;ctx.globalAlpha=is?.75:(isRelated?.22:.07);ctx.lineWidth=is?1.7:1;ctx.stroke();}ctx.globalAlpha=isRelated?1:.15;ctx.fillStyle=n.level===2?f.color:'#19181f';ctx.strokeStyle=f.color;ctx.lineWidth=is?3:(n.level<=2?2:1.4);ctx.fillRect(p.x-r,p.y-r,r*2,r*2);ctx.strokeRect(p.x-r,p.y-r,r*2,r*2);const size=[0,11,9.5,7.5,6.8,6.2][n.level],label=n.label.toUpperCase();ctx.font=`${size}px DM Mono`;ctx.textAlign='center';const ly=p.y+r+13;if(is){const tw=ctx.measureText(label).width;ctx.globalAlpha=.96;ctx.fillStyle='#f1efed';ctx.fillRect(p.x-tw/2-5,ly-size,tw+10,size+5);ctx.fillStyle='#18171d';ctx.fillText(label,p.x,ly);}else{ctx.globalAlpha=isRelated?(n.level<=2?.9:.62):.1;ctx.fillStyle=n.level<=2?'#d5d1d8':'#aaa6b0';ctx.fillText(label,p.x,ly);}ctx.globalAlpha=1;});
  ctx.restore();
}
function hit(x,y){return nodes.filter(visible).reverse().find(n=>{const p=screen(n);return Math.hypot(x-p.x,y-p.y)<18;});}
function pointerPos(e){const r=canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top};}
canvas.addEventListener('pointerdown',e=>{drag=true;movedDuringDrag=false;last=pointerPos(e);canvas.setPointerCapture(e.pointerId);});
canvas.addEventListener('pointermove',e=>{const p=pointerPos(e);if(drag){const dx=p.x-last.x,dy=p.y-last.y;if(Math.hypot(dx,dy)>1)movedDuringDrag=true;camera.x+=dx;camera.y+=dy;last=p;draw();return;}hover=hit(p.x,p.y)||null;canvas.style.cursor=hover?'pointer':'grab';const tip=document.querySelector('#tooltip');if(hover){tip.textContent=hover.label;tip.style.display='block';tip.style.left=`${p.x+14}px`;tip.style.top=`${p.y+12}px`;}else tip.style.display='none';draw();});
canvas.addEventListener('pointerup',e=>{const p=pointerPos(e);drag=false;if(!movedDuringDrag){const n=hit(p.x,p.y);if(n)showDetail(n);}});
canvas.addEventListener('pointerleave',()=>{drag=false;hover=null;document.querySelector('#tooltip').style.display='none';draw();});
canvas.addEventListener('wheel',e=>{e.preventDefault();const p=pointerPos(e),old=camera.z,next=Math.max(.48,Math.min(2.2,old*Math.exp(-e.deltaY*.001)));camera.x=p.x-W/2-(p.x-W/2-camera.x)*(next/old);camera.y=p.y-H/2-(p.y-H/2-camera.y)*(next/old);camera.z=next;draw();},{passive:false});

function showDetail(n){
  selected=n;const f=family(n.family),links=connections(n.id);
  const direct=n.sources||[],seen=new Set(direct.map(s=>s[1]));
  const relatedSources=links.flatMap(x=>(x.sources||[]).map(s=>[`${s[0]} · vía ${x.label}`,s[1]])).filter(s=>!seen.has(s[1])&&seen.add(s[1])).slice(0,4);
  const sourceBlock=(direct.length||relatedSources.length)?`<div class="detail-block" style="--node-color:${f.color}">${direct.length?`<h3>FUENTES DIRECTAS</h3>${direct.map(s=>`<a class="source-link" href="${s[1]}" target="_blank" rel="noreferrer">${s[0]}</a>`).join('')}`:''}${relatedSources.length?`<h3 class="related-heading">BIBLIOGRAFÍA RELACIONADA</h3>${relatedSources.map(s=>`<a class="source-link" href="${s[1]}" target="_blank" rel="noreferrer">${s[0]}</a>`).join('')}`:''}</div>`:'';
  document.querySelector('#detailContent').innerHTML=`<div class="node-code" style="--node-color:${f.color}">NIVEL ${String(n.level).padStart(2,'0')} — ${LEVELS[n.level-1].name.toUpperCase()}</div><h2>${n.label}</h2><p class="detail-intro">${n.intro}</p><div class="detail-block"><h3>FAMILIA / ETIQUETAS</h3><div class="tags"><span class="tag">${f.name}</span>${n.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div></div><div class="detail-block"><h3>INTERSECCIONES / ${links.length}</h3><ul class="connections">${links.map(x=>`<li><button data-node="${x.id}">${x.label}<span>→</span></button></li>`).join('')}</ul></div>${sourceBlock}`;
  document.querySelector('#detailPanel').classList.add('open');document.querySelectorAll('[data-node]').forEach(b=>b.onclick=()=>showDetail(byId[b.dataset.node]));draw();
}
function reset(){camera={x:0,y:0,z:Math.min(1,Math.max(.4,Math.min((W-70)/1050,(H-70)/820)))};selected=null;document.querySelector('#detailPanel').classList.remove('open');draw();}
function buildFilters(){const root=document.querySelector('#filters');const all=[{id:'all',name:'Vista completa',color:'#f1efed'},...FAMILIES];root.innerHTML=all.map((f,i)=>`<button class="filter ${i===0?'active':''}" data-family="${f.id}" style="--family:${f.color}"><span class="num">${String(i).padStart(2,'0')}</span><span class="name">${f.name}</span><span class="count">${f.id==='all'?nodes.length:nodes.filter(n=>n.family===f.id).length}</span></button>`).join('');root.querySelectorAll('button').forEach(b=>b.onclick=()=>{activeFamily=b.dataset.family;root.querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===b));draw();});}
document.querySelector('#searchInput').addEventListener('input',e=>{query=e.target.value.trim().toLowerCase();draw();});
document.querySelector('#depthRange').addEventListener('input',e=>{maxLevel=Number(e.target.value);document.querySelector('#depthValue').value=String(maxLevel).padStart(2,'0');if(selected&&!visible(selected)){selected=null;document.querySelector('#detailPanel').classList.remove('open');}document.querySelector('#nodeCount').textContent=`${nodes.filter(visible).length} NODOS`;draw();});
document.addEventListener('keydown',e=>{if(e.key==='/'&&document.activeElement.tagName!=='INPUT'){e.preventDefault();document.querySelector('#searchInput').focus();}if(e.key==='Escape'){document.querySelector('#detailPanel').classList.remove('open');document.querySelector('#aboutModal').hidden=true;}});
document.querySelector('#resetBtn').onclick=reset;document.querySelector('.brand').onclick=e=>{e.preventDefault();reset();};document.querySelector('#closePanel').onclick=()=>{selected=null;document.querySelector('#detailPanel').classList.remove('open');draw();};
const modal=document.querySelector('#aboutModal');document.querySelector('#aboutBtn').onclick=()=>modal.hidden=false;document.querySelector('#closeAbout').onclick=()=>modal.hidden=true;modal.onclick=e=>{if(e.target===modal)modal.hidden=true;};
const main=document.querySelector('main'),sidebar=document.querySelector('.sidebar'),sidebarToggle=document.querySelector('#mobileInfo');
document.querySelector('#closeSidebar').onclick=()=>{main.classList.add('sidebar-collapsed');sidebar.classList.remove('open');setTimeout(resize,290);};
sidebarToggle.onclick=()=>{if(main.classList.contains('sidebar-collapsed')){main.classList.remove('sidebar-collapsed');setTimeout(resize,290);}else sidebar.classList.toggle('open');};
document.querySelector('#nodeCount').textContent=`${nodes.length} NODOS`;window.addEventListener('resize',resize);
seedLayout();buildFilters();resize();reset();
