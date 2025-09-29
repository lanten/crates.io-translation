window.addEventListener('load', onDomLoad)

function onDomLoad() {
  enableTranslation()
}

async function enableTranslation() {
  const mainArticle = await waitElementReady('main article[aria-label="Readme"]')
  if (!mainArticle) return console.warn('未找到 main article[aria-label="Readme"]')

  mainArticle.setAttribute('translate', 'yes')
  mainArticle.setAttribute('data-translate', 'yes')

  mainArticle.parentElement.style.border = '1.5px dashed rgba(255, 201, 51, 0.75)'
  mainArticle.parentElement.style.boxSizing = 'border-box'
}

async function waitElementReady(selector, timeout = 30000, check) {
  let element = null
  let ivTM
  let tt
  return new Promise((resolve, reject) => {
    ivTM = setInterval(() => {
      element = document.querySelector(selector)
      if (!element) return
      if (check && !check(element)) return
      clearInterval(ivTM)
      clearTimeout(tt)
      resolve(element)
    }, 300)

    tt = setTimeout(() => {
      clearInterval(ivTM)
      reject(new Error(`获取网站元素超时<${selector}>`))
    }, timeout)
  })
}
