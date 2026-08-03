Prompt AI per l'IDE:
"Crea un componente React chiamato '3d-button'. Usa il codice sottostante come implementazione di base. Assicurati che il risultato visivo corrisponda PERFETTAMENTE all'immagine 'preview.png' allegata. Non omettere parti funzionali.

ISTRUZIONI CRITICHE:
1. Se noti che manca il codice CSS (o mancano le definizioni di alcune classi), analizza i link forniti nella 'RICERCA ALTERNATIVA SUL WEB' per recuperare i file di stile originali.
2. Se non riesci a trovare il CSS online, devi INVENTARE il design basandoti esclusivamente sull'immagine 'preview.png' (utilizzando Tailwind CSS), ma mantenendo il codice sorgente fornito per la struttura e il funzionamento logico."

Componente: 3d-button
URL: https://21st.dev/@theutkarshmail/components/3d-button

## STILE INLINE ESTRATTO (bundle.1755031043065.html)

```css
/*! tailwindcss v4.1.10 | MIT License | https://tailwindcss.com */@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-border-style:solid;--tw-leading:initial;--tw-outline-style:solid;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-animation-delay:0s;--tw-animation-direction:normal;--tw-animation-duration:initial;--tw-animation-fill-mode:none;--tw-animation-iteration-count:1;--tw-enter-opacity:1;--tw-enter-rotate:0;--tw-enter-scale:1;--tw-enter-translate-x:0;--tw-enter-translate-y:0;--tw-exit-opacity:1;--tw-exit-rotate:0;--tw-exit-scale:1;--tw-exit-translate-x:0;--tw-exit-translate-y:0}}}@layer theme{:root,:host{--font-sans:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";--font-mono:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;--spacing:.25rem;--text-sm:.875rem;--text-sm--line-height:calc(1.25/.875);--leading-tight:1.25;--radius-sm:calc(var(--radius) - 4px);--radius-md:calc(var(--radius) - 2px);--radius-lg:var(--radius);--radius-xl:calc(var(--radius) + 4px);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono);--color-background:var(--background);--color-foreground:var(--foreground);--color-card:var(--card);--color-card-foreground:var(--card-foreground);--color-popover:var(--popover);--color-popover-foreground:var(--popover-foreground);--color-primary:var(--primary);--color-primary-foreground:var(--primary-foreground);--color-secondary:var(--secondary);--color-secondary-foreground:var(--secondary-foreground);--color-muted:var(--muted);--color-muted-foreground:var(--muted-foreground);--color-accent:var(--accent);--color-accent-foreground:var(--accent-foreground);--color-destructive:var(--destructive);--color-border:var(--border);--color-input:var(--input);--color-ring:var(--ring);--color-chart-1:var(--chart-1);--color-chart-2:var(--chart-2);--color-chart-3:var(--chart-3);--color-chart-4:var(--chart-4);--color-chart-5:var(--chart-5);--color-sidebar:var(--sidebar);--color-sidebar-foreground:var(--sidebar-foreground);--color-sidebar-primary:var(--sidebar-primary);--color-sidebar-primary-foreground:var(--sidebar-primary-foreground);--color-sidebar-accent:var(--sidebar-accent);--color-sidebar-accent-foreground:var(--sidebar-accent-foreground);--color-sidebar-border:var(--sidebar-border);--color-sidebar-ring:var(--sidebar-ring)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab,red,red)){::placeholder{color:color-mix(in oklab,currentcolor 50%,transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){-webkit-appearance:button;-moz-appearance:button;appearance:button}::file-selector-button{-webkit-appearance:button;-moz-appearance:button;appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}*{border-color:var(--border);outline-color:var(--ring)}@supports (color:color-mix(in lab,red,red)){*{outline-color:color-mix(in oklab,var(--ring)50%,transparent)}}body{background-color:var(--background);color:var(--foreground)}}@layer components;@layer utilities{.pointer-events-none{pointer-events:none}.absolute{position:absolute}.fixed{position:fixed}.relative{position:relative}.top-1\/2{top:50%}.top-4{top:calc(var(--spacing)*4)}.right-2{right:calc(var(--spacing)*2)}.left-4{left:calc(var(--spacing)*4)}.z-10{z-index:10}.container{width:100%}@media (min-width:40rem){.container{max-width:40rem}}@media (min-width:48rem){.container{max-width:48rem}}@media (min-width:64rem){.container{max-width:64rem}}@media (min-width:80rem){.container{max-width:80rem}}@media (min-width:96rem){.container{max-width:96rem}}.block{display:block}.flex{display:flex}.inline{display:inline}.h-4{height:calc(var(--spacing)*4)}.h-8{height:calc(var(--spacing)*8)}.min-h-screen{min-height:100vh}.w-4{width:calc(var(--spacing)*4)}.w-screen{width:100vw}.max-w-\[200px\]{max-width:200px}.-translate-y-1\/2{--tw-translate-y: -50% ;translate:var(--tw-translate-x)var(--tw-translate-y)}.transform{transform:var(--tw-rotate-x,)var(--tw-rotate-y,)var(--tw-rotate-z,)var(--tw-skew-x,)var(--tw-skew-y,)}.appearance-none{-webkit-appearance:none;-moz-appearance:none;appearance:none}.flex-col{flex-direction:column}.items-center{align-items:center}.justify-center{justify-content:center}.gap-4{gap:calc(var(--spacing)*4)}.rounded-lg{border-radius:var(--radius)}.border{border-style:var(--tw-border-style);border-width:1px}.bg-background{background-color:var(--background)}.fill-current{fill:currentColor}.p-4{padding:calc(var(--spacing)*4)}.py-0{padding-block:calc(var(--spacing)*0)}.pr-7{padding-right:calc(var(--spacing)*7)}.pl-3{padding-left:calc(var(--spacing)*3)}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.leading-tight{--tw-leading:var(--leading-tight);line-height:var(--leading-tight)}.outline{outline-style:var(--tw-outline-style);outline-width:1px}.filter{filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.running{animation-play-state:running}.focus\:ring-0:focus{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(0px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus\:outline-none:focus{--tw-outline-style:none;outline-style:none}}@property --tw-animation-delay{syntax:"*";inherits:false;initial-value:0s}@property --tw-animation-direction{syntax:"*";inherits:false;initial-value:normal}@property --tw-animation-duration{syntax:"*";inherits:false}@property --tw-animation-fill-mode{syntax:"*";inherits:false;initial-value:none}@property --tw-animation-iteration-count{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-translate-y{syntax:"*";inherits:false;initial-value:0}:root{--radius:.625rem;--background:oklch(100% 0 0);--foreground:oklch(14.5% 0 0);--card:oklch(100% 0 0);--card-foreground:oklch(14.5% 0 0);--popover:oklch(100% 0 0);--popover-foreground:oklch(14.5% 0 0);--primary:oklch(20.5% 0 0);--primary-foreground:oklch(98.5% 0 0);--secondary:oklch(97% 0 0);--secondary-foreground:oklch(20.5% 0 0);--muted:oklch(97% 0 0);--muted-foreground:oklch(55.6% 0 0);--accent:oklch(97% 0 0);--accent-foreground:oklch(20.5% 0 0);--destructive:oklch(57.7% .245 27.325);--border:oklch(92.2% 0 0);--input:oklch(92.2% 0 0);--ring:oklch(70.8% 0 0);--chart-1:oklch(64.6% .222 41.116);--chart-2:oklch(60% .118 184.704);--chart-3:oklch(39.8% .07 227.392);--chart-4:oklch(82.8% .189 84.429);--chart-5:oklch(76.9% .188 70.08);--sidebar:oklch(98.5% 0 0);--sidebar-foreground:oklch(14.5% 0 0);--sidebar-primary:oklch(20.5% 0 0);--sidebar-primary-foreground:oklch(98.5% 0 0);--sidebar-accent:oklch(97% 0 0);--sidebar-accent-foreground:oklch(20.5% 0 0);--sidebar-border:oklch(92.2% 0 0);--sidebar-ring:oklch(70.8% 0 0)}.dark{--background:oklch(14.5% 0 0);--foreground:oklch(98.5% 0 0);--card:oklch(20.5% 0 0);--card-foreground:oklch(98.5% 0 0);--popover:oklch(20.5% 0 0);--popover-foreground:oklch(98.5% 0 0);--primary:oklch(92.2% 0 0);--primary-foreground:oklch(20.5% 0 0);--secondary:oklch(26.9% 0 0);--secondary-foreground:oklch(98.5% 0 0);--muted:oklch(26.9% 0 0);--muted-foreground:oklch(70.8% 0 0);--accent:oklch(26.9% 0 0);--accent-foreground:oklch(98.5% 0 0);--destructive:oklch(70.4% .191 22.216);--border:oklch(100% 0 0/.1);--input:oklch(100% 0 0/.15);--ring:oklch(55.6% 0 0);--chart-1:oklch(48.8% .243 264.376);--chart-2:oklch(69.6% .17 162.48);--chart-3:oklch(76.9% .188 70.08);--chart-4:oklch(62.7% .265 303.9);--chart-5:oklch(64.5% .246 16.439);--sidebar:oklch(20.5% 0 0);--sidebar-foreground:oklch(98.5% 0 0);--sidebar-primary:oklch(48.8% .243 264.376);--sidebar-primary-foreground:oklch(98.5% 0 0);--sidebar-accent:oklch(26.9% 0 0);--sidebar-accent-foreground:oklch(98.5% 0 0);--sidebar-border:oklch(100% 0 0/.1);--sidebar-ring:oklch(55.6% 0 0)}.button{--white:#ffe7ff;--purple-100:#f4b1fd;--purple-200:#d190ff;--purple-300:#c389f2;--purple-400:#8e26e2;--purple-500:#5e2b83;--radius:18px;border-radius:var(--radius);cursor:pointer;letter-spacing:-1px;background:0 0;border:0;outline:none;width:220px;height:80px;font-family:Arial;font-size:23px;position:relative;transform:rotate(353deg)skew(4deg)}.bg{border-radius:inherit;filter:blur(1px);position:absolute;top:0;right:0;bottom:0;left:0}.bg:before,.bg:after{content:"";border-radius:calc(var(--radius)*1.1);background:var(--purple-500);position:absolute;top:0;right:0;bottom:0;left:0}.bg:before{filter:blur(5px);transition:all .3s;box-shadow:-7px 6px #734b9b66,-14px 12px #734b9b4d,-21px 18px 4px #734b9b40,-28px 24px 8px #734b9b26,-35px 30px 12px #734b9b1f,-42px 36px 16px #734b9b14,-56px 42px 20px #734b9b0d}.wrap{border-radius:inherit;background:linear-gradient(to bottom,var(--purple-100)0%,var(--purple-400)100%);height:100%;padding:3px;transition:all .3s;position:relative;overflow:hidden;transform:translate(6px,-6px)}.outline{opacity:0;border-radius:inherit;outline:none;transition:all .4s;position:absolute;top:0;right:0;bottom:0;left:0;overflow:hidden}.outline:before{content:"";background:linear-gradient(90deg,#0000,#fff,#0000);width:120px;height:300px;margin:auto;animation:3s linear infinite paused spin;position:absolute;top:2px;right:2px;bottom:2px;left:2px}.content{pointer-events:none;z-index:1;border-radius:calc(var(--radius)*.85);background:linear-gradient(to bottom,var(--purple-300)0%,var(--purple-400)100%);height:100%;box-shadow:inset -2px 12px 11px -5px var(--purple-200),inset 1px -3px 11px #00000059;justify-content:center;align-items:center;gap:16px;font-weight:600;transition:all .3s;display:flex;position:relative}.content:before{content:"";z-index:10;opacity:.7;background:linear-gradient(to bottom,transparent,var(--purple-400));filter:brightness(1.3)blur(5px);width:80%;margin:auto;position:absolute;top:45%;right:0;bottom:35%;left:0}.char{justify-content:center;align-items:center;transition:all .3s;display:flex}.char span{color:#0000;display:block;position:relative}.char span:nth-child(5){margin-left:5px}.char.state-1 span:nth-child(5){margin-right:-3px}.char.state-1 span{animation:charAppear 1.2s ease backwards calc(var(--i)*30ms)}.char.state-1 span:before,.char span:after{content:attr(data-label);color:var(--white);text-shadow:-1px 1px 2px var(--purple-500);position:absolute;left:0}.char span:before{opacity:0;transform:translateY(-100%)}.char.state-2{position:absolute;left:80px}.char.state-2 span:after{opacity:1}.icon{z-index:10;animation:.8s cubic-bezier(.7,-.5,.3,1.2) forwards resetArrow}.icon div,.icon div:before,.icon div:after{background-color:var(--white);border-radius:1px;height:3px}.icon div:before,.icon div:after{content:"";transform-origin:100%;border-radius:15px;width:14px;transition:all .3s;position:absolute;right:0}.icon div{width:24px;box-shadow:-2px 2px 5px var(--purple-400);background:linear-gradient(to bottom,var(--white),var(--purple-100));animation:1s ease-in-out infinite paused swingArrow;position:relative;transform:scale(.9)}.icon div:before{box-shadow:1px -2px 3px -1px var(--purple-400);animation:1s linear infinite paused rotateArrowLine;top:1px;transform:rotate(44deg)}.icon div:after{box-shadow:-2px 2px 3px 0 var(--purple-400);background:linear-gradient(200deg,var(--white),var(--purple-100));animation:1s linear infinite paused rotateArrowLine2;bottom:1px;transform:rotate(316deg)}.path{z-index:12;stroke-dasharray:150 480;stroke-dashoffset:150px;pointer-events:none;position:absolute;bottom:0;left:0;right:0}.splash{pointer-events:none;stroke-dasharray:60 60;stroke-dashoffset:60px;stroke:var(--purple-300);position:absolute;top:0;left:0;transform:translate(-17%,-31%)}.button:hover .words{opacity:1}.button:hover .words span{animation-play-state:running}.button:hover .char.state-1 span:before{animation:charAppear .7s ease calc(var(--i)*30ms)}.button:hover .char.state-1 span:after{opacity:1;animation:charDisappear .7s ease calc(var(--i)*30ms)}.button:hover .wrap{transform:translate(8px,-8px)}.button:hover .outline{opacity:1}.button:hover .outline:before,.button:hover .icon div:before,.button:hover .icon div:after,.button:hover .icon div{animation-play-state:running}.button:active .bg:before{filter:blur(5px);opacity:.7;box-shadow:-7px 6px #734b9b66,-14px 12px #734b9b40,-21px 18px 4px #734b9b26}.button:active .content{box-shadow:inset -1px 12px 8px -5px #47008966,inset 0 -3px 8px 0 var(--purple-200)}.button:active .words,.button:active .outline{opacity:0}.button:active .wrap{transform:translate(3px,-3px)}.button:active .splash{animation:.8s cubic-bezier(.3,0,0,1) 50ms forwards splash}.button:focus .path{animation:1.6s .2s forwards path}.button:focus .icon{animation:1s cubic-bezier(.7,-.5,.3,1.5) forwards arrow}.char.state-2 span:after,.button:focus .char.state-1 span{animation:charDisappear .5s ease forwards calc(var(--i)*30ms)}.button:focus .char.state-2 span:after{animation:charAppear 1s ease backwards calc(var(--i)*30ms)}@keyframes spin{to{transform:rotate(360deg)}}@keyframes charAppear{0%{opacity:0;filter:blur(20px);transform:translateY(50%)}20%{opacity:1;transform:translateY(70%)}50%{opacity:1;filter:blur();transform:translateY(-15%)}to{opacity:1;transform:translateY(0)}}@keyframes charDisappear{0%{opacity:1;transform:translateY(0)}to{opacity:0;filter:blur(3px);transform:translateY(-70%)}}@keyframes arrow{0%{opacity:1}50%{opacity:0;transform:translate(60px)}51%{opacity:0;transform:translate(-200px)}to{opacity:1;transform:translate(-128px)}}@keyframes swingArrow{50%{transform:translate(5px)scale(.9)}}@keyframes rotateArrowLine{50%{transform:rotate(30deg)}80%{transform:rotate(55deg)}}@keyframes rotateArrowLine2{50%{transform:rotate(330deg)}80%{transform:rotate(300deg)}}@keyframes resetArrow{0%{transform:translate(-128px)}to{transform:translate(0)}}@keyframes path{0%{stroke:#fff}to{stroke-dashoffset:-480px;stroke:#f9c6fe}}@keyframes splash{to{stroke-dasharray:2 60;stroke-dashoffset:-60px}}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-leading{syntax:"*";inherits:false}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}
```

## STILE CSS (index.1755031039441.css)

```css
@import "tailwindcss";
@import "tw-animate-css";


@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes charAppear {
  0% {
    transform: translateY(50%);
    opacity: 0;
    filter: blur(20px);
  }
  20% {
    transform: translateY(70%);
    opacity: 1;
  }
  50% {
    transform: translateY(-15%);
    opacity: 1;
    filter: blur(0);
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes charDisappear {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-70%);
    opacity: 0;
    filter: blur(3px);
  }
}

@keyframes arrow {
  0% {
    opacity: 1;
  }
  50% {
    transform: translateX(60px);
    opacity: 0;
  }
  51% {
    transform: translateX(-200px);
    opacity: 0;
  }
  100% {
    transform: translateX(-128px);
    opacity: 1;
  }
}

@keyframes swingArrow {
  50% {
    transform: translateX(5px) scale(0.9);
  }
}

@keyframes rotateArrowLine {
  50% {
    transform: rotate(30deg);
  }
  80% {
    transform: rotate(55deg);
  }
}

@keyframes rotateArrowLine2 {
  50% {
    transform: rotate(330deg);
  }
  80% {
    transform: rotate(300deg);
  }
}

@keyframes resetArrow {
  0% {
    transform: translateX(-128px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes path {
  from {
    stroke: white;
  }
  to {
    stroke-dashoffset: -480;
    stroke: #f9c6fe;
  }
}

@keyframes splash {
  to {
    stroke-dasharray: 2 60;
    stroke-dashoffset: -60;
  }
}
```

## CODICE SORGENTE (code.demo.1755031043065.tsx)

```tsx
import { Component } from "@/components/ui/3d-button";

export default function DemoOne() {
  return <Component />;
}

```

## CODICE SORGENTE (code.1755031039440.tsx)

```tsx
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Component = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={cn("flex flex-col items-center gap-4 p-4 rounded-lg")}>

      <button className="button">
        <div className="bg" />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 342 208" height={208} width={342} className="splash">
          <path strokeLinecap="round" strokeWidth={3} d="M54.1054 99.7837C54.1054 99.7837 40.0984 90.7874 26.6893 97.6362C13.2802 104.485 1.5 97.6362 1.5 97.6362" />
          <path strokeLinecap="round" strokeWidth={3} d="M285.273 99.7841C285.273 99.7841 299.28 90.7879 312.689 97.6367C326.098 104.486 340.105 95.4893 340.105 95.4893" />
          <path strokeLinecap="round" strokeWidth={3} strokeOpacity="0.3" d="M281.133 64.9917C281.133 64.9917 287.96 49.8089 302.934 48.2295C317.908 46.6501 319.712 36.5272 319.712 36.5272" />
          <path strokeLinecap="round" strokeWidth={3} strokeOpacity="0.3" d="M281.133 138.984C281.133 138.984 287.96 154.167 302.934 155.746C317.908 157.326 319.712 167.449 319.712 167.449" />
          <path strokeLinecap="round" strokeWidth={3} d="M230.578 57.4476C230.578 57.4476 225.785 41.5051 236.061 30.4998C246.337 19.4945 244.686 12.9998 244.686 12.9998" />
          <path strokeLinecap="round" strokeWidth={3} d="M230.578 150.528C230.578 150.528 225.785 166.471 236.061 177.476C246.337 188.481 244.686 194.976 244.686 194.976" />
          <path strokeLinecap="round" strokeWidth={3} strokeOpacity="0.3" d="M170.392 57.0278C170.392 57.0278 173.89 42.1322 169.571 29.54C165.252 16.9478 168.751 2.05227 168.751 2.05227" />
          <path strokeLinecap="round" strokeWidth={3} strokeOpacity="0.3" d="M170.392 150.948C170.392 150.948 173.89 165.844 169.571 178.436C165.252 191.028 168.751 205.924 168.751 205.924" />
          <path strokeLinecap="round" strokeWidth={3} d="M112.609 57.4476C112.609 57.4476 117.401 41.5051 107.125 30.4998C96.8492 19.4945 98.5 12.9998 98.5 12.9998" />
          <path strokeLinecap="round" strokeWidth={3} d="M112.609 150.528C112.609 150.528 117.401 166.471 107.125 177.476C96.8492 188.481 98.5 194.976 98.5 194.976" />
          <path strokeLinecap="round" strokeWidth={3} strokeOpacity="0.3" d="M62.2941 64.9917C62.2941 64.9917 55.4671 49.8089 40.4932 48.2295C25.5194 46.6501 23.7159 36.5272 23.7159 36.5272" />
          <path strokeLinecap="round" strokeWidth={3} strokeOpacity="0.3" d="M62.2941 145.984C62.2941 145.984 55.4671 161.167 40.4932 162.746C25.5194 164.326 23.7159 174.449 23.7159 174.449" />
        </svg>
        <div className="wrap">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 221 42" height={42} width={221} className="path">
            <path strokeLinecap="round" strokeWidth={3} d="M182.674 2H203C211.837 2 219 9.16344 219 18V24C219 32.8366 211.837 40 203 40H18C9.16345 40 2 32.8366 2 24V18C2 9.16344 9.16344 2 18 2H47.8855" />
          </svg>
          <div className="outline" />
          <div className="content">
            <span className="char state-1">
              <span data-label="J" style={{"--i": 1}}>J</span>
              <span data-label="o" style={{"--i": 2}}>o</span>
              <span data-label="i" style={{"--i": 3}}>i</span>
              <span data-label="n" style={{"--i": 4}}>n</span>
              <span data-label="T" style={{"--i": 5}}>T</span>
              <span data-label="o" style={{"--i": 6}}>o</span>
              <span data-label="d" style={{"--i": 7}}>d</span>
              <span data-label="a" style={{"--i": 8}}>a</span>
              <span data-label="y" style={{"--i": 9}}>y</span>
            </span>
            <div className="icon">
              <div />
            </div>
            <span className="char state-2">
              <span data-label="J" style={{"--i": 1}}>J</span>
              <span data-label="o" style={{"--i": 2}}>o</span>
              <span data-label="i" style={{"--i": 3}}>i</span>
              <span data-label="n" style={{"--i": 4}}>n</span>
              <span data-label="N" style={{"--i": 5}}>N</span>
              <span data-label="o" style={{"--i": 6}}>o</span>
              <span data-label="w" style={{"--i": 7}}>w</span>
            </span>
          </div>
        </div>
      </button>
   

    </div>
  );
};

```


## DEEP RESEARCH CONTESTUALE

> Questa sezione contiene il codice estratto dalle fonti primarie sul web per **3d-button**. L'IA deve UNIFICARE questo codice con quello scaricato da 21st.dev per assicurarsi che non manchi nulla (specialmente CSS o animazioni framer-motion).

### FALLBACK: [React Component Library From Scratch using Tailwind CSS](https://duckduckgo.com/y.js?ad_domain=udemy.com&ad_provider=bingv7aa&ad_type=txad&click_metadata=diIkmF9EB26ZQXfoR-Un6qDcyYd05wBWN5xHR9lD3rCcQwmcj2kes2_XUgsmMOGCccN40m7isli2fi725qxO3uLcapQdbRa_SlSW_QN1eH2G9kuo0kaArQYXjAAVGI-tJMUeo3GzTy73c9xpMj7kJTUVy0xNTrgEJ3e5m1ukTU4.HoXT7y81oPvEFxiAEOLRuw&rut=7b4b08d3108deaf24cf7f2c2fb5f89d27837bd4efd994845caaf3688103336cd&u3=https://www.bing.com/aclick?ld=e84z_CFZGInwTjh37MttBgmzVUCUxAKbxSkoVkDK8JheSka6KtlAnjINcHTVptnhV59_xNdzWks0djNK-PbQVGceLCaZuByl4pQu_O2-goFXnI3Jik6k31ZpUpc-G5-NCMXpUScIRwTl6qXMoSf6GJyJ3-yu3kiUKyyz_eTaNLaOJ1GbyUFefmZHeB1BzXUdwwSEhNGbHfZLu90Q4fgUZtf05Glro&u=aHR0cHMlM2ElMmYlMmZ3d3cudWRlbXkuY29tJTJmY291cnNlJTJmcmVhY3QtY29tcG9uZW50LWxpYnJhcnktZnJvbS1zY3JhdGNoLXVzaW5nLXRhaWx3aW5kLWNzcyUyZiUzZnV0bV9jYW1wYWlnbiUzZEJHLVNlYXJjaF9EU0FfQWxwaGFfUHJvZl9sYS5FTl9jYy5ST1ctRW5nbGlzaCUyNnV0bV9zb3VyY2UlM2RiaW5nJTI2dXRtX21lZGl1bSUzZHBhaWQtc2VhcmNoJTI2cG9ydGZvbGlvJTNkQmluZy1ST1ctRW5nbGlzaCUyNnV0bV9hdWRpZW5jZSUzZG14JTI2dXRtX3RhY3RpYyUzZG5iJTI2dXRtX3Rlcm0lM2RfLl9hZ18xMzI2MDEzNDExNjc2MzMyXy5fYWRfXy5fa3dfUmVhY3QlMjUyMEpTJTI1MjBlbiUyNnV0bV9jb250ZW50JTNkcyUyNmZ1bm5lbCUzZCUyNnRlc3QlM2QlMjZ1dG1fY2FtcGFpZ25faWQlM2Q2Mzg1OTYyMjglMjZtc2Nsa2lkJTNkM2I4NzE1YjBkMjdhMWEwMGIwN2Y3ZmMwNTkyMTg0Y2U&rlid=3b8715b0d27a1a00b07f7fc0592184ce&vqd=4-330372038611871163740290863234370297670&iurl={1}IG=2B51777FD3804EB4A2705CC0A59E5B20&CID=06061E3CCAFB67A700FB0996CB136640&ID=DevEx,5037.1)
