
// console.log('加载options.js')
document.addEventListener('keydown', function (event) {
	if ((event.ctrlKey === true || event.metaKey === true)
		&& ( event.key === '+' || event.key === '-'
			|| event.key === '=' || event.key === '_' 
            || event.key === 'u' || event.key === 's')) {
		event.preventDefault()
	}
}, false)

document.body.addEventListener('wheel', (e) => {
    if (e.ctrlKey) {
        if (e.deltaY < 0) {
            e.preventDefault()
            return false
        }
        if (e.deltaY > 0) {
            e.preventDefault()
            return false
        }
    }
  }, 
  { passive: false }
)


document.oncontextmenu = function (event) {
    if (window.event) {
        event = window.event
    }
    try {
        var the = event.target
        if (!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")) {
            return false
        }
        return true
    } catch (e) {
        return false
    }
}


function fuckyou() {
    window.open("/", "_blank")  
    window.close() 
    window.location = "about:blank" 
}

function hehe() {
    if ((window.console && (console.firebug || console.table && /firebug/i.test(console.table()))) || (
        typeof opera =='object' && typeof opera.postError == 'function' && console.profile.length > 0)) {
        fuckyou()
    }
    if (typeof console.profiles == "object" && console.profiles.length > 0) {
        fuckyou()
    }
}

hehe()

document.onkeydown = function (event) {

    if ((event.keyCode == 112) || //屏蔽 F1

        (event.keyCode == 113) || //屏蔽 F2

        (event.keyCode == 114) || //屏蔽 F3

        (event.keyCode == 115) || //屏蔽 F4

        // (event.keyCode == 116) || //屏蔽 F5

        (event.keyCode == 117) || //屏蔽 F6

        (event.keyCode == 118) || //屏蔽 F7

        (event.keyCode == 119) || //屏蔽 F8

        (event.keyCode == 120) || //屏蔽 F9

        (event.keyCode == 121) || //屏蔽 F10

        // (event.keyCode == 122) || //屏蔽 F11

        (event.keyCode == 123)) //屏蔽 F12

    {
        return false
    }
}
window.onhelp = function () {
    return false
}

