function easyAJAX(method = 'GET', url){
    let xhr = new XMLHttpRequest()
    if(xhr)
        xhr.open(method, url)
    else 
        return 
    xhr.send()
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && 200 <= xhr.status && xhr.status < 300) {
            let data = xhr.response.data 
            console.log(data) 
        } else {
            console.warn('数据请求失败')
        }
    }
}