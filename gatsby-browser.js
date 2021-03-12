const addScript = (url) => {
  const script = document.createElement('script')

  script.src = url
  document.body.appendChild(script)

  return script
}

exports.onClientEntry = () => {
  window.onload = () => {
    const first = addScript('//js.api.here.com/v3/3.1/mapsjs-core.js')

    first.onload = () => {
      addScript('//js.api.here.com/v3/3.1/mapsjs-service.js')
      addScript('//js.api.here.com/v3/3.1/mapsjs-mapevents.js')
      addScript('//js.api.here.com/v3/3.1/mapsjs-ui.js')
    }
  }
}
