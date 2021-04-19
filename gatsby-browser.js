const addScript = (url) => {
  // eslint-disable-next-line no-undef
  const script = document.createElement('script')

  script.src = url
  // eslint-disable-next-line no-undef
  document.body.appendChild(script)

  return script
}

exports.onClientEntry = () => {
  // eslint-disable-next-line no-undef
  window.onload = () => {
    const first = addScript('//js.api.here.com/v3/3.1/mapsjs-core.js')

    first.onload = () => {
      addScript('//js.api.here.com/v3/3.1/mapsjs-service.js')
      addScript('//js.api.here.com/v3/3.1/mapsjs-mapevents.js')
      addScript('//js.api.here.com/v3/3.1/mapsjs-ui.js')
    }
  }
}
