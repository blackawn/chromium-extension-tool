const passCopyingLogic = () => {

  // logic node
  const contentElement = document.querySelector('.blog-content-box')

  if (contentElement) {

    const codeElement = contentElement.querySelectorAll('code')

    codeElement.forEach(elCode => {
      elCode.style.userSelect = 'auto'
      const elPre = elCode.closest('pre')
      if (elPre) {
        elPre.style.userSelect = 'auto'
      }
    })

    const outerHTML = contentElement.outerHTML

    contentElement.outerHTML = outerHTML
  }

}

passCopyingLogic()
