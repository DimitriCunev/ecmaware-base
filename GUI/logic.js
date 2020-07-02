let colps = {}
let enemyglow = [255,0,0]
let allyglow = [255,0,0]

document.querySelectorAll('.colp').forEach(e=>{
	colps[e.id]=({
		el:e,
		obj:Pickr.create({
			el: '#'+e.id,
			theme: 'nano', // or 'monolith', or 'nano'
			width:'15px',
			position: 'right-start',
			inline: false,
			default:'black',
			components: {
		
				// Main components
				preview: true,
				hue: true,
		
				// Input / output Options
				interaction: {
					rgb: true,
				}
			}
		})
	})
})
Object.entries(colps).forEach(e=>{
	e[1].obj.on('change',(color,instance)=>{
		e[1].obj.applyColor(true)
	})
	e[1].obj.on('init',()=>{refreshColors()})
})
console.log(colps)
function refreshColors(){
	!localStorage['bg']?colps['col1'].obj.setColor('white',false):colps['col1'].obj.setColor(localStorage['bg'],false)
	!localStorage['txt']?colps['col2'].obj.setColor('black',false):colps['col2'].obj.setColor(localStorage['txt'],false)
	!localStorage['btn']?colps['col3'].obj.setColor('gray',false):colps['col3'].obj.setColor(localStorage['btn'],false)
	!localStorage['allywh']?colps['col4'].obj.setColor('#4cd137',false):colps['col4'].obj.setColor(localStorage['allywh'],false)
	!localStorage['enewh']?colps['col5'].obj.setColor('#e74c3c',false):colps['col5'].obj.setColor(localStorage['enewh'],false)
	!localStorage['enehi']?colps['col6'].obj.setColor('#f5f6fa',false):0
	!localStorage['enesh']?colps['col7'].obj.setColor('#353b48',false):0

	colps['col1'].obj.on('change',(color,instance)=>{
		colps['col1'].obj.applyColor('true')
		document.body.style.backgroundColor=color.toRGBA()
		localStorage['bg'] = color.toRGBA()
	})
	colps['col2'].obj.on('change',(color,instance)=>{
		colps['col2'].obj.applyColor('true')
		document.querySelector("body > div.ml-5.mt-5.mr-5 > div.logo").style = `background-color:`+color.toRGBA()
		document.body.style.color=color.toRGBA()
		document.getElementsByTagName('h1').forEach(e=>{
			e.style.color=color.toRGBA()
		})
		document.getElementsByTagName('h2').forEach(e=>{
			e.style.color=color.toRGBA()
		})
		document.getElementsByTagName('h3').forEach(e=>{
			e.style.color=color.toRGBA()
		})
		document.getElementsByTagName('a').forEach(e=>{
			e.style.color=color.toRGBA()
		})
		localStorage['txt'] = color.toRGBA()

	})

	colps['col3'].obj.on('change',(color,instance)=>{
		colps['col3'].obj.applyColor('true')
		localStorage['btn'] = color.toRGBA()
		

	})
	colps['col4'].obj.on('change',(color,instance)=>{
		colps['col4'].obj.applyColor('true')
		localStorage['allywh'] = color.toRGBA()
		allyglow = [color.toRGBA()[0]/255,color.toRGBA()[1]/255,color.toRGBA()[2]/255]
		

	})
	colps['col5'].obj.on('change',(color,instance)=>{
		colps['col5'].obj.applyColor('true')
		localStorage['enewh'] = color.toRGBA()
		enemyglow = [color.toRGBA()[0]/255,color.toRGBA()[1]/255,color.toRGBA()[2]/255]

	})
}
setInterval(()=>{
	document.getElementsByClassName('nav-link').forEach(e=>{

		if(e.classList.contains('active')){
			e.style.backgroundColor=colps['col3'].obj.getColor().toRGBA()

		} else {
			e.style.backgroundColor='rgba(0,0,0,0)'
		}
	})

})
client = io.connect('http://localhost:3000')
setInterval(e=>{
	client.emit('aimdata',{smoothX:1-document.querySelector("#v-pills-profile > div:nth-child(7) > input").value/100,smoothY:1-document.querySelector("#v-pills-profile > div:nth-child(9) > input").value/100})
	client.emit('glowdata',{ally:allyglow,enemy:enemyglow})
},1000)
document.querySelector("#customSwitches4").onchange = ()=>{
	client.emit('glowtoggle',true)
}
document.querySelector("#customSwitches").onchange = ()=>{
	client.emit('aimtoggle',true)
}
// col1.on('change',(color,instance)=>{
// 	col1.applyColor(true)
// 	console.log(color)
// })