/* ============ CONFIGURACIÓN (editar antes de publicar) ============ */
var CONFIG = {
  correo: 'contacto@tuempresa.cl',   // correo que recibe las cotizaciones
  whatsapp: '56900000000',           // número con código de país, sin + ni espacios
  empresa: 'Topografía Servicios',
  telefono: '',                      // opcional, ej: '+56 9 1234 5678'
  direccion: '',                     // opcional, ej: 'San Bernardo, Región Metropolitana'
  mostrarEstimado: true              // false para ocultar el valor referencial en el cotizador
};
var WA_OK = !!CONFIG.whatsapp && CONFIG.whatsapp !== '56900000000';
var MAIL_OK = !!CONFIG.correo && CONFIG.correo.indexOf('tuempresa') === -1;

/* ============ FOTOGRAFÍAS (Wikimedia Commons, licencias libres) ============ */
var FOTOS = {
  hero:{f:'TS by The sea.jpg',a:'Riccardo.salvini',l:'CC BY 4.0'},
  levantamiento:{f:'Tacheometric surveying with Vega TEO-5 2024-06.jpg',a:'Maxinvestigator',l:'CC BY-SA 4.0'},
  replanteo:{f:'Highway Calumpit railway station construction sites 06.jpg',a:'FBenjr123',l:'CC BY-SA 4.0'},
  nivelacion:{f:'Survey level and field technician.jpg',a:'Cvstr',l:'CC BY 4.0'},
  control:{f:'Wiesbaden Middle School construction (25133897527).jpg',a:'U.S. Army Corps of Engineers Europe District',l:'Dominio público'},
  cubicacion:{f:'Excavator and earthworks by Bluestone - geograph.org.uk - 7512741.jpg',a:'TCExplorer',l:'CC BY-SA 2.0'},
  dron:{f:'Quadcopter camera drone in flight.jpg',a:'Josh Sorenson',l:'CC0'},
  loteo:{f:'Stonefields Residential Subdivision Akld.jpg',a:'Ingolfson',l:'Dominio público'},
  deslindes:{f:'NJ-NY-PA Tri-States Monument - 2013 top view.jpg',a:'Zeete',l:'CC BY-SA 4.0'},
  gnss:{f:'GPS P1150899.JPG',a:'David Monniaux',l:'CC BY-SA 3.0'},
  escaneo:{f:'Terrestrial laserscanner.jpg',a:'Ekrem Canli',l:'CC BY-SA 3.0'},
  arquitectonico:{f:'Hugman-Silber-Architects-blueprint-1.jpg',a:'Answir',l:'CC BY-SA 4.0'},
  sig:{f:'Manatee County, Florida - soil interpretive map of limitations for soil drainage and water table depths LOC 81690317.jpg',a:'U.S. Soil Conservation Service / U.S. Geological Survey',l:'Dominio público'},
  arriendo:{f:'Surveying prism and total station, for land surveying, in Shibuya-ku.jpg',a:'Syced',l:'CC0'}
};
function fotoUrl(k,w){return 'https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(FOTOS[k].f)+'?width='+(w||800);}
function fotoPage(k){return 'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(FOTOS[k].f.replace(/ /g,'_'));}
/* Si una foto no carga, se muestra la ilustración como respaldo */
document.addEventListener('error',function(e){var t=e.target;
  if(t&&t.tagName==='IMG'&&t.dataset.k){var k=t.dataset.k;var d=document.createElement('div');d.className='fallback';d.style.cssText='width:100%;height:100%';d.innerHTML=art(SVGKEY[k]||k);t.replaceWith(d);}
},true);
var SVGKEY={hero:'levantamiento'};
function img(k,w,alt,eager){return '<img src="'+fotoUrl(k,w)+'" data-k="'+k+'" alt="'+(alt||'')+'" '+(eager?'':'loading="lazy" ')+'decoding="async" referrerpolicy="no-referrer">';}

var S = {
  sky:'<rect width="400" height="250" fill="#cfe6ee"/><circle cx="330" cy="50" r="22" fill="#fcd34d"/>',
  hills:'<path d="M0 170 Q100 110 200 160 T400 140 V250 H0Z" fill="#7aa383"/><path d="M0 200 Q120 160 240 195 T400 185 V250 H0Z" fill="#4f7a5c"/>',
  tripod:function(x,y,s){s=s||1;return '<g transform="translate('+x+','+y+') scale('+s+')" stroke="#1f2937" stroke-width="3" fill="none" stroke-linecap="round"><path d="M0 0 L-22 52 M0 0 L22 52 M0 0 L0 54"/><rect x="-11" y="-30" width="22" height="26" rx="3" fill="#f59e0b" stroke="#92400e"/><circle cx="0" cy="-18" r="5" fill="#1e293b"/></g>'},
  rnd:function(i){var x=Math.sin(i*127.1)*43758.5453;return x-Math.floor(x)},
  svgs:{}
};
S.svgs.levantamiento=function(){return S.sky+S.hills+'<g stroke="#c2410c" stroke-width="1.5" fill="none" opacity=".8"><path d="M20 215Q120 180 220 210T390 200"/><path d="M20 228Q120 194 220 224T390 214"/></g>'+S.tripod(130,150,1.1)+'<g fill="#c2410c"><circle cx="250" cy="195" r="5"/><circle cx="310" cy="178" r="5"/><circle cx="345" cy="210" r="5"/></g><path d="M250 195L310 178L345 210" stroke="#c2410c" stroke-dasharray="5 4" fill="none" stroke-width="2"/>'};
S.svgs.replanteo=function(){return S.sky+'<rect y="170" width="400" height="80" fill="#a8a29e"/><rect x="150" y="185" width="110" height="50" fill="none" stroke="#c2410c" stroke-width="3" stroke-dasharray="8 5"/>'+[150,260].map(function(x){return [185,235].map(function(y){return '<g><rect x="'+(x-3)+'" y="'+(y-22)+'" width="6" height="22" fill="#f59e0b"/><rect x="'+(x-3)+'" y="'+(y-22)+'" width="6" height="7" fill="#dc2626"/></g>'}).join('')}).join('')+S.tripod(80,130,1.1)+'<path d="M95 165 L150 185" stroke="#dc2626" stroke-width="2" stroke-dasharray="4 4"/>'};
S.svgs.nivelacion=function(){return S.sky+'<path d="M0 190 H400 V250 H0Z" fill="#8b7355"/>'+S.tripod(90,140,1.1)+'<g><rect x="300" y="100" width="14" height="90" fill="#fde68a" stroke="#92400e" stroke-width="2"/>'+[110,125,140,155,170].map(function(y){return '<line x1="300" x2="314" y1="'+y+'" y2="'+y+'" stroke="#92400e" stroke-width="2"/>'}).join('')+'</g><path d="M105 122 H300" stroke="#dc2626" stroke-width="2" stroke-dasharray="6 4"/><text x="150" y="112" font-size="14" fill="#dc2626" font-family="monospace">cota 0.00</text>'};
S.svgs.cubicacion=function(){return S.sky+'<rect y="190" width="400" height="60" fill="#8b7355"/><path d="M60 190 L130 110 L200 190Z" fill="#a16207"/><path d="M180 190 L260 85 L340 190Z" fill="#b45309"/><g stroke="#1f2937" stroke-width="1" opacity=".5">'+[0,1,2,3,4,5].map(function(i){return '<path d="M'+(60+i*30)+' 190 L'+(130+i*8)+' 120"/>'}).join('')+'</g><text x="150" y="228" font-size="15" fill="#fff" font-family="monospace" font-weight="bold">V = 12.480 m³</text>'+S.tripod(360,160,.8)};
S.svgs.dron=function(){return S.sky+S.hills+'<g transform="translate(200,70)"><rect x="-22" y="-6" width="44" height="12" rx="6" fill="#1f2937"/><path d="M-22 -6L-46 -18M22 -6L46 -18M-22 6L-46 18M22 6L46 18" stroke="#1f2937" stroke-width="3"/>'+[[-46,-18],[46,-18],[-46,18],[46,18]].map(function(p){return '<ellipse cx="'+p[0]+'" cy="'+p[1]+'" rx="14" ry="3" fill="#475569"/>'}).join('')+'<circle cy="9" r="4" fill="#38bdf8"/></g><path d="M200 82 L130 190 M200 82 L270 190" stroke="#fde047" stroke-width="2" stroke-dasharray="5 4" opacity=".9"/><path d="M130 190 L270 190" stroke="#fde047" stroke-width="3"/>'};
S.svgs.loteo=function(){return S.sky+'<rect y="110" width="400" height="140" fill="#9ca3af" opacity=".25"/><rect x="40" y="120" width="320" height="110" fill="#86efac" stroke="#166534" stroke-width="3"/><path d="M147 120V230M253 120V230M40 175H360" stroke="#166534" stroke-width="2.5"/><g font-family="monospace" font-size="16" fill="#14532d" font-weight="bold"><text x="85" y="152">L1</text><text x="190" y="152">L2</text><text x="295" y="152">L3</text><text x="85" y="208">L4</text><text x="190" y="208">L5</text><text x="295" y="208">L6</text></g>'+S.tripod(370,150,.7)};
S.svgs.deslindes=function(){return '<rect width="400" height="250" fill="#ecf3e4"/><g stroke="#cfd6c6" stroke-width="1">'+[0,1,2,3,4,5,6,7].map(function(i){return '<path d="M0 '+(i*34)+'H400M'+(i*58)+' 0V250"/>'}).join('')+'</g><path d="M80 70 L300 50 L340 170 L120 205Z" fill="#bbf7d0" stroke="#166534" stroke-width="3"/>'+[[80,70],[300,50],[340,170],[120,205]].map(function(p){return '<rect x="'+(p[0]-7)+'" y="'+(p[1]-7)+'" width="14" height="14" fill="#dc2626" stroke="#fff" stroke-width="2"/>'}).join('')+'<g font-family="monospace" font-size="13" fill="#14532d" font-weight="bold"><text x="150" y="52">45,20 m</text><text x="318" y="112" transform="rotate(80 318 112)">38,75 m</text><text x="170" y="205">52,10 m</text></g>'+S.tripod(40,170,.7)};
S.svgs.control=function(){return S.sky+'<rect x="150" y="60" width="90" height="170" fill="#9ca3af" stroke="#4b5563" stroke-width="3"/><g fill="#e5e7eb">'+[0,1,2,3].map(function(r){return [0,1,2].map(function(c){return '<rect x="'+(160+c*28)+'" y="'+(72+r*38)+'" width="18" height="24"/>'}).join('')}).join('')+'</g><path d="M150 60 L158 36" stroke="#c2410c" stroke-width="3"/><rect y="230" width="400" height="20" fill="#6b7280"/><g fill="#c2410c"><circle cx="150" cy="70" r="6"/><circle cx="240" cy="70" r="6"/><circle cx="150" cy="210" r="6"/><circle cx="240" cy="210" r="6"/></g>'+S.tripod(320,170,1)+'<path d="M305 150 L248 72" stroke="#dc2626" stroke-dasharray="5 4" stroke-width="2"/>'};
S.svgs.gnss=function(){return '<rect width="400" height="250" fill="#0f172a"/><g fill="#fff" opacity=".7"><circle cx="40" cy="30" r="1.5"/><circle cx="120" cy="60" r="1.5"/><circle cx="330" cy="30" r="1.5"/><circle cx="370" cy="90" r="1.5"/><circle cx="70" cy="110" r="1.5"/></g>'+[[90,50],[200,30],[310,60]].map(function(p){return '<g transform="translate('+p[0]+','+p[1]+')"><rect x="-16" y="-8" width="32" height="16" fill="#cbd5e1"/><rect x="-34" y="-5" width="16" height="10" fill="#38bdf8"/><rect x="18" y="-5" width="16" height="10" fill="#38bdf8"/></g><path d="M'+p[0]+' '+(p[1]+10)+' L200 190" stroke="#fde047" stroke-dasharray="4 4" opacity=".7"/>'}).join('')+'<rect y="215" width="400" height="35" fill="#166534"/><g transform="translate(200,190)"><rect x="-4" y="0" width="8" height="26" fill="#475569"/><ellipse cx="0" cy="-2" rx="14" ry="7" fill="#f59e0b" stroke="#92400e" stroke-width="2"/></g>'};
S.svgs.escaneo=function(){var d='';for(var i=0;i<150;i++){var x=170+S.rnd(i)*190,y=40+S.rnd(i+300)*170,edge=(Math.abs(x-250)<3||Math.abs(x-340)<3||Math.abs(y-70)<3);d+='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+(edge?2.2:1.5)+'" fill="'+(i%3?'#2dd4bf':'#fbbf24')+'" opacity=".9"/>'}
  var wall='<path d="M190 210 V80 L250 40 L340 40 V210" fill="none" stroke="#2dd4bf" stroke-width="1.5" opacity=".6"/>';
  var rays='<g stroke="#f87171" stroke-width="1" opacity=".5">'+[60,85,110,140,170,195].map(function(y){return '<path d="M85 150 L190 '+y+'"/>'}).join('')+'</g>';
  return '<rect width="400" height="250" fill="#0f172a"/>'+wall+d+rays+S.tripod(85,150,1.15)+'<rect y="226" width="400" height="24" fill="#1e293b"/>'};
S.svgs.arquitectonico=function(){return '<rect width="400" height="250" fill="#1e3a8a"/><g stroke="#fff" stroke-width=".6" opacity=".25">'+[0,1,2,3,4,5,6,7,8,9,10,11,12].map(function(i){return '<path d="M'+(i*32)+' 0V250"/>'}).join('')+[0,1,2,3,4,5,6,7].map(function(i){return '<path d="M0 '+(i*32)+'H400"/>'}).join('')+'</g><g fill="none" stroke="#fff" stroke-width="4"><rect x="70" y="50" width="260" height="150"/><path d="M200 50V130M70 130H200M270 130V200"/></g><g fill="none" stroke="#93c5fd" stroke-width="2"><path d="M200 105 A25 25 0 0 1 225 130" /><path d="M120 200 A25 25 0 0 0 145 175"/></g><path d="M70 225 H330" stroke="#fde047" stroke-width="2"/><path d="M70 218V232M330 218V232" stroke="#fde047" stroke-width="2"/><text x="170" y="244" font-size="14" fill="#fde047" font-family="monospace">12,40 m</text>'};
S.svgs.sig=function(){return '<rect width="400" height="250" fill="#e8efe6"/>'+[['#93c5fd',150],['#86efac',115],['#fde68a',80]].map(function(l){return '<polygon points="200,'+(l[1]+10)+' 340,'+(l[1]+50)+' 200,'+(l[1]+90)+' 60,'+(l[1]+50)+'" fill="'+l[0]+'" stroke="#334155" stroke-width="1.5" opacity=".92"/>'}).join('')+'<path d="M130 85 q40 -20 70 10 t80 -5" stroke="#c2410c" stroke-width="3" fill="none"/><g transform="translate(250,40)"><path d="M0 0 C-14 -2 -18 -26 0 -34 C18 -26 14 -2 0 0Z" fill="#dc2626" stroke="#fff" stroke-width="2"/><circle cy="-22" r="5" fill="#fff"/></g>'};
S.svgs.arriendo=function(){return S.sky+'<rect y="190" width="400" height="60" fill="#8b7355"/>'+S.tripod(100,135,1.1)+'<g transform="translate(220,0)"><rect x="-3" y="85" width="6" height="105" fill="#475569"/><ellipse cx="0" cy="82" rx="18" ry="8" fill="#f59e0b" stroke="#92400e" stroke-width="2"/><circle cx="0" cy="190" r="5" fill="#1e293b"/></g><g transform="translate(290,190)"><rect x="0" y="0" width="80" height="40" rx="6" fill="#1f2937"/><rect x="6" y="6" width="68" height="28" rx="4" fill="#374151"/><rect x="28" y="-8" width="24" height="10" rx="4" fill="#1f2937"/></g><text x="30" y="35" font-size="18" fill="#c2410c" font-weight="800" font-family="system-ui">ARRIENDO</text>'};
function art(key){return '<svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Ilustración de '+key+'">'+S.svgs[key]()+'</svg>';}

/* ---------- DATOS ---------- */
var SERVICIOS=[
 {id:'levantamiento',nombre:'Levantamiento topográfico',rubro:'Construcción',base:350000,desc:'Planimetría y altimetría de terrenos con curvas de nivel, deslindes, construcciones y servicios existentes.',pts:['Curvas de nivel a la equidistancia que necesites','Ubicación de deslindes, edificaciones y arborización','Plano en DWG y PDF georreferenciado']},
 {id:'replanteo',nombre:'Replanteo de obras',rubro:'Construcción',base:280000,desc:'Traspaso de ejes, cotas y puntos del proyecto al terreno para edificios, caminos, redes y fundaciones.',pts:['Marcación de ejes y vértices con estacas o clavos','Control de alineación y cotas','Registro fotográfico y acta de replanteo']},
 {id:'nivelacion',nombre:'Nivelación geométrica',rubro:'Construcción',base:200000,desc:'Control de cotas y pendientes para drenaje, pavimentos, canales y montaje de estructuras.',pts:['Nivelación de ida y vuelta con cierre','Control de pendientes de drenaje y canales','Cuadro de cotas y perfiles']},
 {id:'control',nombre:'Control de obra y deformaciones',rubro:'Construcción',base:380000,desc:'Monitoreo de asentamientos, verticalidad y desplazamientos en estructuras, taludes y excavaciones.',pts:['Prismas y puntos de control monitoreados','Campañas periódicas de medición','Reportes de deformación con gráficos']},
 {id:'cubicacion',nombre:'Cubicaciones y volúmenes',rubro:'Minería',base:320000,desc:'Cálculo de movimientos de tierra, acopios y botaderos, con comparación entre levantamientos sucesivos.',pts:['Volúmenes de corte y relleno','Medición de acopios y botaderos','Informe comparativo entre fechas']},
 {id:'dron',nombre:'Aerofotogrametría con dron',rubro:'Minería',base:450000,desc:'Ortomosaicos, modelos digitales de terreno y nubes de puntos de grandes superficies en poco tiempo.',pts:['Ortomosaico de alta resolución','Modelo digital de terreno y superficie','Nube de puntos y curvas de nivel']},
 {id:'loteo',nombre:'Subdivisiones y loteos',rubro:'Inmobiliario',base:420000,desc:'Planos de subdivisión, fusión y deslindes con la documentación técnica para trámites municipales o del SAG.',pts:['Plano de subdivisión y cuadro de superficies','Amojonamiento de vértices','Documentación técnica para tu trámite']},
 {id:'deslindes',nombre:'Verificación de deslindes',rubro:'Inmobiliario',base:260000,desc:'Comprobamos en terreno dónde están los límites de tu propiedad según títulos y planos, y los dejamos marcados.',pts:['Revisión de títulos y planos existentes','Ubicación y marcación de hitos','Informe con diferencias de superficie']},
 {id:'gnss',nombre:'Topografía satelital GNSS',rubro:'Ingeniería',base:250000,desc:'Amarre de proyectos a la red geodésica y puntos de control con receptores GNSS de precisión.',pts:['Puntos de control con receptor GNSS','Postproceso y ajuste de coordenadas','Monografías de los puntos']},
 {id:'sig',nombre:'Asesoría en SIG',rubro:'Ingeniería',base:300000,desc:'Organizamos tu información espacial en mapas, bases de datos geográficas y análisis para decidir mejor.',pts:['Mapas temáticos y bases de datos geoespaciales','Análisis de superficies, pendientes y cercanías','Visores y entregas en formatos GIS/KMZ']},
 {id:'escaneo',nombre:'Escaneo láser 3D',rubro:'Arquitectura',base:520000,desc:'Capturamos edificios, instalaciones y terrenos en nubes de puntos de alta densidad para planos y modelos 3D.',pts:['Nube de puntos LiDAR / SLAM','Planimetría y cortes a partir del escaneo','Modelo 3D y recorridos virtuales']},
 {id:'arquitectonico',nombre:'Levantamiento arquitectónico',rubro:'Arquitectura',base:380000,desc:'Plantas, cortes y fachadas de construcciones existentes, para remodelaciones, regularizaciones y patrimonio.',pts:['Plantas, cortes y elevaciones acotadas','Planos para regularizar o remodelar','Entrega en DWG y PDF']},
 {id:'arriendo',nombre:'Arriendo de equipos',rubro:'Equipos',base:45000,desc:'Estaciones totales, GNSS, niveles y teodolitos para que midas tú, con o sin capacitación de uso.',pts:['Estaciones totales, GNSS y niveles','Arriendo por día, semana o mes','Capacitación básica opcional']}
];
var RUBROS=['Todos'].concat(Array.from(new Set(SERVICIOS.map(function(s){return s.rubro}))));
var CASOS=[
 {t:'Loteo de un predio rural',cat:'Inmobiliario',svc:'loteo',txt:'Levantamiento del predio, diseño de lotes, amojonamiento y plano para el trámite de subdivisión.',pts:'Plano de subdivisión · cuadro de superficies · hitos'},
 {t:'Replanteo de edificio',cat:'Construcción',svc:'replanteo',txt:'Traspaso de ejes y cotas de fundaciones desde los planos de arquitectura al terreno.',pts:'Ejes marcados · acta de replanteo · control de cotas'},
 {t:'Cubicación mensual de acopios',cat:'Minería',svc:'cubicacion',txt:'Vuelo con dron y cálculo de volúmenes de acopios, comparados con el mes anterior.',pts:'Modelo de superficie · volúmenes · informe comparativo'},
 {t:'Ortofoto de un predio agrícola',cat:'Minería',svc:'dron',txt:'Cobertura aérea completa con ortomosaico y curvas de nivel para planificar riego o caminos.',pts:'Ortomosaico · MDT · curvas de nivel'},
 {t:'Levantamiento de una casa patrimonial',cat:'Arquitectura',svc:'escaneo',txt:'Escaneo láser interior y exterior para generar plantas, cortes y un modelo 3D.',pts:'Nube de puntos · planos · modelo 3D'},
 {t:'Control de excavación y talud',cat:'Construcción',svc:'control',txt:'Mediciones periódicas de puntos para detectar desplazamientos durante la obra.',pts:'Campañas de medición · gráficos de deformación'},
 {t:'Mapa de infraestructura en SIG',cat:'Ingeniería',svc:'sig',txt:'Integración de redes, predios y capas existentes en una base geográfica consultable.',pts:'Base geoespacial · mapas · visor'},
 {t:'Verificación de límites de una propiedad',cat:'Inmobiliario',svc:'deslindes',txt:'Revisión de títulos y marcación de deslindes antes de una compraventa o un cierre.',pts:'Hitos marcados · informe de superficies'}
];
var CATS=['Todos'].concat(Array.from(new Set(CASOS.map(function(c){return c.cat}))));
var REGIONES=['Arica y Parinacota','Tarapacá','Antofagasta','Atacama','Coquimbo','Valparaíso','Metropolitana','O’Higgins','Maule','Ñuble','Biobío','La Araucanía','Los Ríos','Los Lagos','Aysén','Magallanes'];
var ENTREGABLES=['Plano DWG','Plano PDF','Archivo KMZ / Google Earth','Nube de puntos (LAS/XYZ)','Ortomosaico (GeoTIFF)','Informe técnico','Cuadro de coordenadas (Excel)','Modelo 3D'];
var CONDICIONALES={
 levantamiento:{t:'Levantamiento',c:[['equidistancia','Equidistancia de curvas','select',['0,5 m','1 m','2 m','5 m']],['detalles','Detalles a levantar','text','Edificios, árboles, postes, cercos…']]},
 replanteo:{t:'Replanteo',c:[['obra','Tipo de obra','select',['Edificio / casa','Camino o pavimento','Redes húmedas / secas','Fundaciones / pilotes','Otra']],['puntos','N.º aproximado de puntos a replantear','number','']]},
 nivelacion:{t:'Nivelación',c:[['largo','Longitud o recorrido a nivelar (m)','number',''],['ptoref','¿Existe punto de cota de referencia (BM)?','select',['Sí','No','No sé']]]},
 cubicacion:{t:'Cubicaciones',c:[['acopios','N.º de acopios o sectores','number',''],['base','¿Tiene levantamiento base anterior?','select',['Sí','No']]]},
 dron:{t:'Aerofotogrametría con dron',c:[['gsd','Resolución deseada (GSD)','select',['2 cm/píxel','5 cm/píxel','10 cm/píxel','No sé']],['vuelo','Restricciones de vuelo cercanas','select',['No hay','Sí, hay aeródromo','Zona poblada','No sé']]]},
 loteo:{t:'Subdivisión / loteo',c:[['zona','Ubicación del predio','select',['Urbano','Rústico','No sé']],['lotes','N.º de lotes proyectados','number',''],['rol','Rol de avalúo del predio','text','000-00']]},
 deslindes:{t:'Verificación de deslindes',c:[['hitos','N.º de vértices o hitos','number',''],['titulos','¿Cuenta con títulos o planos inscritos?','select',['Sí','No','Parcialmente']]]},
 control:{t:'Control de obra y deformaciones',c:[['elemento','Elemento a monitorear','select',['Edificio','Talud / excavación','Muro de contención','Puente / estructura','Otro']],['frecuencia','Frecuencia de medición','select',['Semanal','Quincenal','Mensual','Única vez']]]},
 gnss:{t:'Georreferenciación GNSS',c:[['npc','N.º de puntos de control','number',''],['ppp','¿Necesita certificación de precisión?','select',['Sí','No']]]},
 sig:{t:'Asesoría en SIG',c:[['entrega','Tipo de entrega','select',['Mapa temático','Base de datos geoespacial','Visor web','Análisis espacial']],['capas','Información que ya tienes','text','Shapes, KMZ, planillas…']]},
 escaneo:{t:'Escaneo láser 3D',c:[['ambiente','Ambiente a escanear','select',['Interior','Exterior','Interior y exterior']],['area','Área aproximada a escanear (m²)','number','']]},
 arquitectonico:{t:'Levantamiento arquitectónico',c:[['alcance','Alcance','select',['Plantas','Plantas y cortes','Plantas, cortes y fachadas']],['pisos','N.º de pisos','number','']]},
 arriendo:{t:'Arriendo de equipos',c:[['equipo','Equipo requerido','select',['Estación total','Receptor GNSS','Nivel automático','Teodolito','Varios']],['dias','Días de arriendo','number','3'],['capac','¿Requiere capacitación?','select',['No','Sí, básica en terreno']]]}
};

/* ============ UTILIDADES ============ */
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.from((r||document).querySelectorAll(s))};
var PAGE=document.body.dataset.page;
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var state={svc:new Set(),step:0,filter:'Todos',cfilter:'Todos',current:null,files:[]};
function lsGet(k){try{return localStorage.getItem(k)}catch(e){return null}}
function lsSet(k,v){try{localStorage.setItem(k,v)}catch(e){}}
function lsDel(k){try{localStorage.removeItem(k)}catch(e){}}
function svcById(id){return SERVICIOS.find(function(s){return s.id===id})}
function onlyRental(){return state.svc.size>0&&Array.from(state.svc).every(function(i){return i==='arriendo'})}
function toast(m){var t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast._t);toast._t=setTimeout(function(){t.classList.remove('on')},2200);}
try{state.svc=new Set((JSON.parse(lsGet('topo_svc')||'[]')).filter(function(i){return CONDICIONALES[i]}));}catch(e){}
function saveSvc(){lsSet('topo_svc',JSON.stringify(Array.from(state.svc)));}
function updateCount(){var n=state.svc.size;$$('.qcount').forEach(function(b){b.textContent=n;b.style.display=n?'inline':'none'});}
function toggleSvc(id,force,quiet){
  var was=state.svc.has(id);
  if(force===true)state.svc.add(id);else if(force===false)state.svc.delete(id);else(was?state.svc.delete(id):state.svc.add(id));
  saveSvc();updateCount();
  if(typeof window.onSvcChange==='function')window.onSvcChange();
  if(!quiet)toast(state.svc.has(id)?'Agregado a tu cotización':'Quitado de tu cotización');
}
function contactRows(){var r=[];
  if(MAIL_OK)r.push('<a href="mailto:'+CONFIG.correo+'">'+CONFIG.correo+'</a>');
  if(CONFIG.telefono)r.push('<a href="tel:'+CONFIG.telefono.replace(/[^+\d]/g,'')+'">'+CONFIG.telefono+'</a>');
  if(CONFIG.direccion)r.push('<span>'+CONFIG.direccion+'</span>');return r;}

/* ============ CABECERA Y PIE COMUNES ============ */
var NAV=[['index.html','Inicio','home'],['servicios.html','Servicios','servicios'],['casos.html','Casos','casos'],['arriendo.html','Arriendo','arriendo'],['guias.html','Guías y preguntas','guias']];
(function chrome(){
  var links=NAV.map(function(n){return '<a href="'+n[0]+'"'+(PAGE===n[2]?' class="act" aria-current="page"':'')+'>'+n[1]+'</a>'}).join('');
  $('#hdr').outerHTML='<header class="nav"><div class="wrap"><a class="logo" href="index.html">TOPO<span>GRAFÍA</span> SERVICIOS</a>'+
    '<button id="menuBtn" aria-label="Abrir menú" aria-expanded="false">☰</button><nav class="menu" id="menu">'+links+
    '<a class="cta" href="cotizar.html">Cotizar <b class="qcount" style="display:none">0</b></a></nav></div></header>';
  var rows=contactRows();
  $('#ftr').outerHTML='<footer><div class="wrap"><div class="cols">'+
    '<div><h4>'+CONFIG.empresa+'</h4><p>Topografía, geomática y arriendo de instrumental para obras, loteos y proyectos de ingeniería.</p></div>'+
    '<div><h4>Servicios</h4><a href="servicios.html">Todos los servicios</a><a href="casos.html">Casos tipo</a><a href="arriendo.html">Arriendo de equipos</a><a href="guias.html#loteos">Loteos y subdivisiones</a></div>'+
    '<div><h4>Ayuda</h4><a href="guias.html#faq">Preguntas frecuentes</a><a href="guias.html#kmz">Guía para hacer un KMZ</a><a href="cotizar.html">Cotizar en línea</a><a href="guias.html#creditos">Créditos de imágenes</a></div>'+
    (rows.length?'<div><h4>Contacto</h4>'+rows.join('')+'</div>':'')+
    '</div><div class="copy">© '+new Date().getFullYear()+' '+CONFIG.empresa+' · Todos los derechos reservados</div></div></footer>';
  document.body.insertAdjacentHTML('beforeend',
    '<dialog id="dlg"><button class="x" id="dlgClose" aria-label="Cerrar">✕</button><div class="img" id="dlgImg"></div>'+
    '<div class="in"><span class="pill" id="dlgTag"></span><h3 id="dlgTitle"></h3><p id="dlgDesc"></p><ul id="dlgList"></ul><div class="photocred" id="dlgCred"></div>'+
    '<div class="btns"><button class="btn primary" id="dlgAdd">Agregar a mi cotización</button><a class="btn ghost" href="cotizar.html">Ir al cotizador</a></div></div></dialog>'+
    '<div class="toast" id="toast" role="status"></div>'+
    '<div class="fab" id="fab">'+(WA_OK?'<a href="https://wa.me/'+CONFIG.whatsapp+'" target="_blank" rel="noopener" aria-label="WhatsApp">WA</a>':'')+(PAGE!=='cotizar'?'<a class="q" href="cotizar.html" aria-label="Cotizar">✎</a>':'')+'</div>');
  $('#menuBtn').onclick=function(){var o=$('#menu').classList.toggle('open');this.setAttribute('aria-expanded',o)};
  $('#dlgClose').onclick=function(){$('#dlg').close()};
  $('#dlg').addEventListener('click',function(e){if(e.target===this)this.close()});
  $('#dlgAdd').onclick=function(){toggleSvc(state.current);$('#dlg').close();};
  updateCount();
})();
document.addEventListener('click',function(e){var b=e.target.closest('[data-quote]');if(!b)return;
  toggleSvc(b.dataset.quote,true,true);location.href='cotizar.html';});
function openInfo(id){var s=svcById(id);state.current=id;
  $('#dlgImg').innerHTML=img(id,1000,s.nombre,true);$('#dlgTag').textContent=s.rubro;$('#dlgTitle').textContent=s.nombre;$('#dlgDesc').textContent=s.desc;
  $('#dlgList').innerHTML=s.pts.map(function(p){return '<li>'+p+'</li>'}).join('');
  $('#dlgCred').innerHTML='Foto: '+FOTOS[id].a+' · '+FOTOS[id].l+' · <a href="'+fotoPage(id)+'" target="_blank" rel="noopener">Wikimedia Commons</a>';
  $('#dlgAdd').textContent=state.svc.has(id)?'Quitar de mi cotización':'Agregar a mi cotización';$('#dlg').showModal();}
function reveal(){var els=$$('.rv:not(.in)');
  if(!('IntersectionObserver' in window)||reduce){els.forEach(function(e){e.classList.add('in')});return}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
  els.forEach(function(e){io.observe(e)});}
function svcCard(s,opts){opts=opts||{};var on=state.svc.has(s.id);
  return '<article class="card"><div class="img" data-info="'+s.id+'">'+img(s.id,700,s.nombre)+'</div><div class="body"><span class="pill">'+s.rubro+'</span><h3>'+s.nombre+'</h3><p>'+s.desc+'</p><div class="row"><button class="btn small ghost" data-info="'+s.id+'">Ver detalle</button><button class="btn small '+(on?'ghost':'primary')+'" data-add="'+s.id+'">'+(on?'✓ Agregado':'Cotizar')+'</button></div></div></article>';}
function bindCards(box,rerender){
  box.addEventListener('click',function(e){
    var i=e.target.closest('[data-info]');if(i){openInfo(i.dataset.info);return;}
    var a=e.target.closest('[data-add]');if(a){toggleSvc(a.dataset.add);rerender();}
  });}

/* ============ PÁGINAS ============ */
var PAGES={};

/* ----- Inicio ----- */
PAGES.home=function(){
  var SLIDES=[
   {k:'hero',tag:'Topografía y replanteo',h:'Medimos bien para que tu obra parta bien',p:'Levantamientos, replanteo y control de obra con estación total y GNSS, en proyectos de cualquier tamaño.',svc:'levantamiento'},
   {k:'dron',tag:'Aerofotogrametría',h:'Tu terreno completo, visto desde el aire',p:'Ortofotos, modelos de terreno y cubicaciones con drones. Más superficie medida en menos tiempo.',svc:'dron'},
   {k:'escaneo',tag:'Escaneo láser 3D',h:'Nubes de puntos para planos y modelos precisos',p:'Edificios, instalaciones y terrenos capturados con escáner láser, listos para tu proyecto.',svc:'escaneo'},
   {k:'loteo',tag:'Loteos y subdivisiones',h:'Del predio completo a lotes listos para tramitar',p:'Planos, cuadros de superficie y amojonamiento para tu subdivisión.',svc:'loteo'},
   {k:'arriendo',tag:'Arriendo de equipos',h:'Instrumental topográfico para tus propios trabajos',p:'Estaciones totales, GNSS y niveles por día, semana o mes, con capacitación opcional.',svc:'arriendo'}];
  var si=0,timer=null;
  $('#slides').innerHTML=SLIDES.map(function(s,i){var H=i===0?'h1':'h2 class="h1"',Hc=i===0?'h1':'h2';
    return '<div class="slide'+(i===0?' on':'')+'" role="group" aria-label="'+(i+1)+' de '+SLIDES.length+'">'+img(s.k,1600,s.tag,i===0)+
    '<div class="wrap"><div class="txt"><div class="tag">'+s.tag+'</div><'+H+'>'+s.h+'</'+Hc+'><p>'+s.p+'</p><div class="btns"><button class="btn primary" data-quote="'+s.svc+'">Cotizar este servicio</button><a class="btn ghost" href="servicios.html">Ver servicios</a></div></div></div></div>'}).join('');
  $('#dots').innerHTML=SLIDES.map(function(s,i){return '<button class="dot'+(i===0?' on':'')+'" aria-label="Ir a la diapositiva '+(i+1)+'" data-i="'+i+'"></button>'}).join('');
  function go(n){si=(n+SLIDES.length)%SLIDES.length;$$('.slide').forEach(function(e,i){e.classList.toggle('on',i===si)});$$('.dot').forEach(function(e,i){e.classList.toggle('on',i===si)});}
  function start(){stop();if(!reduce)timer=setInterval(function(){go(si+1)},6500)}function stop(){clearInterval(timer)}
  $('#dots').onclick=function(e){var b=e.target.closest('[data-i]');if(b){go(+b.dataset.i);start()}};
  $('#prevS').onclick=function(){go(si-1);start()};$('#nextS').onclick=function(){go(si+1);start()};
  var h=$('#inicio');h.addEventListener('mouseenter',stop);h.addEventListener('mouseleave',start);h.addEventListener('focusin',stop);h.addEventListener('focusout',start);start();
  var feat=['levantamiento','replanteo','dron','cubicacion','escaneo','loteo'];
  function draw(){$('#featured').innerHTML=feat.map(function(id){return svcCard(svcById(id))}).join('');}
  draw();bindCards($('#featured'),draw);window.onSvcChange=draw;
};

/* ----- Servicios ----- */
PAGES.servicios=function(){
  var RUBROS=['Todos'].concat(Array.from(new Set(SERVICIOS.map(function(s){return s.rubro}))));
  function filters(){$('#filters').innerHTML=RUBROS.map(function(r){return '<button class="chip'+(r===state.filter?' on':'')+'" data-r="'+r+'">'+r+'</button>'}).join('');}
  function grid(){$('#grid').innerHTML=SERVICIOS.filter(function(s){return state.filter==='Todos'||s.rubro===state.filter}).map(function(s){return svcCard(s)}).join('');}
  $('#filters').addEventListener('click',function(e){var b=e.target.closest('[data-r]');if(!b)return;state.filter=b.dataset.r;filters();grid();});
  filters();grid();bindCards($('#grid'),grid);window.onSvcChange=grid;
};

/* ----- Casos ----- */
PAGES.casos=function(){
  var CATS=['Todos'].concat(Array.from(new Set(CASOS.map(function(c){return c.cat}))));
  function filters(){$('#cfilters').innerHTML=CATS.map(function(r){return '<button class="chip'+(r===state.cfilter?' on':'')+'" data-c="'+r+'">'+r+'</button>'}).join('');}
  function grid(){$('#cgrid').innerHTML=CASOS.filter(function(c){return state.cfilter==='Todos'||c.cat===state.cfilter}).map(function(c){
    return '<article class="card"><div class="img" data-info="'+c.svc+'">'+img(c.svc,700,c.t)+'</div><div class="body"><span class="badge">Caso tipo</span><span class="pill">'+c.cat+'</span><h3>'+c.t+'</h3><p>'+c.txt+'</p><p style="font-size:.84rem"><b>Entregas:</b> '+c.pts+'</p><div class="row"><button class="btn small ghost" data-info="'+c.svc+'">Ver servicio</button><button class="btn small primary" data-quote="'+c.svc+'">Cotizar algo así</button></div></div></article>'}).join('');}
  $('#cfilters').addEventListener('click',function(e){var b=e.target.closest('[data-c]');if(!b)return;state.cfilter=b.dataset.c;filters();grid();});
  $('#cgrid').addEventListener('click',function(e){var i=e.target.closest('[data-info]');if(i)openInfo(i.dataset.info)});
  filters();grid();
};

/* ----- Arriendo ----- */
PAGES.arriendo=function(){};

/* ----- Guías (pestañas + créditos) ----- */
PAGES.guias=function(){
  var tabs=$$('.tab'),panes=$$('.tabpane');
  function show(id){if(!panes.some(function(p){return p.id===id}))id='loteos';
    tabs.forEach(function(t){var on=t.dataset.t===id;t.classList.toggle('on',on);t.setAttribute('aria-selected',on)});
    panes.forEach(function(p){p.classList.toggle('on',p.id===id)});}
  tabs.forEach(function(t){t.onclick=function(){show(t.dataset.t);history.replaceState(null,'','#'+t.dataset.t)}});
  window.addEventListener('hashchange',function(){show(location.hash.slice(1))});
  show(location.hash.slice(1));
  $('#credits').innerHTML=Object.keys(FOTOS).map(function(k){var f=FOTOS[k],n=k==='hero'?'Portada':svcById(k).nombre;
    return '<div class="credit">'+img(k,200,'')+'<div><b>'+n+'</b><span>'+f.a+' · '+f.l+'</span><br><a href="'+fotoPage(k)+'" target="_blank" rel="noopener">Ver original</a></div></div>'}).join('');
};

/* ----- Cotizador ----- */
PAGES.cotizar=function(){
  var form=$('#form');
  var rows=contactRows();
  if(rows.length)$('#contactBox').innerHTML='<h3 style="margin:0 0 8px">¿Prefieres escribirnos directo?</h3><ul class="contact-list">'+rows.map(function(r){return '<li>'+r+'</li>'}).join('')+'</ul>';
  if(!WA_OK)$('#sendWa').style.display='none';
  if(!MAIL_OK){$('#sendMail').style.display='none';$('#sendHint').textContent='Copia o descarga tu solicitud para enviarla.';}
  $('select[name=region]').innerHTML='<option value="">Selecciona…</option>'+REGIONES.map(function(r){return '<option>'+r+'</option>'}).join('');
  $('#pick').innerHTML=SERVICIOS.map(function(s){return '<label><input type="checkbox" value="'+s.id+'"><span class="mini">'+img(s.id,160,'')+'</span><span>'+s.nombre+'</span></label>'}).join('');
  $('#entregables').innerHTML=ENTREGABLES.map(function(e){return '<label><input type="checkbox" name="ent" value="'+e+'"><span>'+e+'</span></label>'}).join('');
  $('#pick').addEventListener('change',function(e){if(e.target.type==='checkbox')toggleSvc(e.target.value,e.target.checked,true);});
  function syncPick(){$$('#pick input').forEach(function(i){i.checked=state.svc.has(i.value)});}
  function renderConds(){
    var keep={};$$('#conds [name]').forEach(function(i){keep[i.name]=i.value});
    $('#conds').innerHTML=Array.from(state.svc).map(function(id){var c=CONDICIONALES[id];
      return '<div class="cond"><h4>Detalles de: '+c.t+'</h4><div class="f2">'+c.c.map(function(f){var n=id+'_'+f[0],v=keep[n]!==undefined?keep[n]:(f[2]==='number'&&f[3]?f[3]:''),h='<label>'+f[1];
        if(f[2]==='select')h+='<select name="'+n+'">'+f[3].map(function(o){return '<option'+(o===v?' selected':'')+'>'+o+'</option>'}).join('')+'</select>';
        else h+='<input name="'+n+'" type="'+f[2]+'" value="'+v+'" placeholder="'+(f[2]==='number'?'':f[3]||'')+'">';
        return h+'</label>'}).join('')+'</div></div>'}).join('');
  }
  window.onSvcChange=function(){syncPick();renderConds();save();};
  function showStep(n){state.step=n;
    $$('.pane').forEach(function(p){p.classList.toggle('on',+p.dataset.p===n)});
    $$('#progress div').forEach(function(d,i){d.classList.toggle('on',i===n);d.classList.toggle('done',i<n)});
    $('#prev').style.visibility=n===0?'hidden':'visible';$('#next').style.display=n===3?'none':'inline-block';
    if(n===3)buildSummary();
  }
  function validate(n){
    var ok=true,rent=onlyRental();
    $$('.pane[data-p="'+n+'"] [required]').forEach(function(i){
      var skip=rent&&i.hasAttribute('data-skip-rental');var e=i.parentElement.querySelector('.err');
      var bad=!skip&&(!i.value.trim()||(i.type==='email'&&!/^\S+@\S+\.\S+$/.test(i.value))||(i.type==='tel'&&i.value.replace(/\D/g,'').length<8));
      i.classList.toggle('bad',bad);if(e)e.textContent=bad?(i.type==='email'?'Correo no válido':i.type==='tel'?'Teléfono no válido':'Campo obligatorio'):'';if(bad)ok=false;});
    if(n===1){var bad=state.svc.size===0;$('#errSvc').textContent=bad?'Selecciona al menos un servicio':'';if(bad)ok=false;}
    if(!ok){var f=$('.pane.on .bad')||$('#errSvc');f.scrollIntoView({block:'center',behavior:'smooth'});}
    return ok;
  }
  $('#next').onclick=function(){if(validate(state.step)){showStep(state.step+1);$('.quote').scrollIntoView({behavior:reduce?'auto':'smooth'});}};
  $('#prev').onclick=function(){showStep(state.step-1)};
  $$('#progress div').forEach(function(d,i){d.onclick=function(){if(i<state.step)showStep(i)}});
  form.addEventListener('submit',function(e){e.preventDefault()});
  $('#files').addEventListener('change',function(){state.files=Array.from(this.files).map(function(f){return f.name});$('#fileNames').textContent=state.files.length?'Archivos: '+state.files.join(', '):'';save();});
  function data(){var f=new FormData(form),o={};f.forEach(function(v,k){if(k!=='ent')o[k]=v});o.ent=f.getAll('ent');return o;}
  function buildText(){
    var d=data(),L=[],rent=onlyRental();
    L.push('SOLICITUD DE COTIZACIÓN - '+CONFIG.empresa,'Fecha: '+new Date().toLocaleDateString('es-CL'),'');
    L.push('== CONTACTO ==','Nombre: '+d.nombre,'Tipo de cliente: '+d.tipo,'Empresa: '+(d.empresa||'-'),'Correo: '+d.email,'Teléfono: '+d.tel,'Contacto preferido: '+d.medio,'');
    L.push('== SERVICIOS ==');
    Array.from(state.svc).forEach(function(id){var c=CONDICIONALES[id];L.push('* '+c.t);c.c.forEach(function(f){var v=d[id+'_'+f[0]];if(v)L.push('    - '+f[1]+': '+v)})});
    L.push('','== UBICACIÓN'+(rent?'':' Y TERRENO')+' ==','Región: '+d.region,'Comuna: '+d.comuna,'Dirección / sector: '+d.direccion,'Coordenadas: '+(d.coord||'-'));
    if(!rent)L.push('Superficie: '+d.sup+' '+d.unidad,'Tipo de terreno: '+d.relieve,'Acceso: '+d.acceso);
    L.push('','== ESPECIFICACIONES ==','Sistema de coordenadas: '+d.datum,'Precisión requerida: '+d.prec,'Uso del trabajo: '+d.uso,'Información previa: '+d.previo,'Inicio deseado: '+(d.inicio||'-'),'Plazo: '+d.plazo,'Entregables: '+(d.ent.length?d.ent.join(', '):'-'),'Archivos que adjuntaré: '+(state.files.length?state.files.join(', '):'-'),'','Observaciones: '+(d.obs||'-'));
    return L.join('\n');
  }
  function estimate(){
    var d=data(),base=0,rental=0;
    state.svc.forEach(function(id){if(id==='arriendo')rental+=svcById(id).base*Math.max(1,+d.arriendo_dias||1);else base+=svcById(id).base});
    var m2=+d.sup||0;if(d.unidad==='hectáreas')m2*=10000;if(d.unidad==='km lineales')m2*=3000;
    var fs=m2>50000?1.6:m2>10000?1.3:m2>2000?1.1:1;
    var fr={'Plano':1,'Ondulado':1.1,'Accidentado / cerro':1.3,'Con vegetación densa':1.25,'Urbano / construido':1.15}[d.relieve]||1;
    var fp={'Referencial (±20 cm)':.9,'Alta (±2 cm)':1.25}[d.prec]||1;var fu=d.plazo&&d.plazo.indexOf('Urgente')===0?1.25:1;
    var v=base*fs*fr*fp*fu;if(state.svc.size>1&&base>0)v*=.92;v+=rental;
    var lo=Math.round(v*.85/10000)*10000,hi=Math.round(v*1.15/10000)*10000,f=function(n){return '$'+n.toLocaleString('es-CL')};
    return 'Estimación referencial: <b>'+f(lo)+' – '+f(hi)+'</b> + IVA. Es solo una guía; el valor final se confirma tras revisar tu información.';
  }
  function buildSummary(){$('#summary').textContent=buildText();if(CONFIG.mostrarEstimado)$('#est').innerHTML=estimate();else $('#est').style.display='none';}
  function subject(){return 'Cotización: '+Array.from(state.svc).map(function(i){return CONDICIONALES[i].t}).join(', ')}
  $('#sendMail').onclick=function(){location.href='mailto:'+CONFIG.correo+'?subject='+encodeURIComponent(subject())+'&body='+encodeURIComponent(buildText());};
  $('#sendWa').onclick=function(){window.open('https://wa.me/'+CONFIG.whatsapp+'?text='+encodeURIComponent(buildText()),'_blank','noopener');};
  $('#copy').onclick=function(){if(navigator.clipboard)navigator.clipboard.writeText(buildText()).then(function(){toast('Solicitud copiada')},function(){toast('No se pudo copiar')});else toast('No se pudo copiar');};
  $('#dl').onclick=function(){var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([buildText()],{type:'text/plain;charset=utf-8'}));a.download='solicitud-cotizacion.txt';a.click();URL.revokeObjectURL(a.href);};
  $('#reset').onclick=function(){if(confirm('¿Borrar los datos ingresados y empezar de nuevo?')){lsDel('topo_form2');lsDel('topo_svc');location.reload();}};
  function save(){var o={};new FormData(form).forEach(function(v,k){if(k==='ent'){(o.ent=o.ent||[]).push(v)}else o[k]=v});lsSet('topo_form2',JSON.stringify({d:o,files:state.files}))}
  function load(){try{var s=JSON.parse(lsGet('topo_form2')||'null');if(!s)return;state.files=s.files||[];
    Object.keys(s.d).forEach(function(k){if(k==='ent')return;var el=form.elements[k];if(el&&el.type!=='checkbox')el.value=s.d[k]});
    (s.d.ent||[]).forEach(function(v){var i=$('#entregables input[value="'+v+'"]');if(i)i.checked=true});
    if(state.files.length)$('#fileNames').textContent='Archivos (selecciónalos de nuevo para adjuntar): '+state.files.join(', ');}catch(e){}}
  form.addEventListener('input',save);form.addEventListener('change',save);
  renderConds();load();syncPick();showStep(0);
};

var ph=$('#pheadImg');if(ph)ph.src=fotoUrl(ph.dataset.k,1600);
if($('#equipPhoto'))$('#equipPhoto').innerHTML=img('arriendo',900,'Estación total y prisma para levantamiento topográfico');
if($('#kmzPhoto'))$('#kmzPhoto').innerHTML=img('deslindes',900,'Hito de deslinde');
if(PAGES[PAGE])PAGES[PAGE]();
reveal();
