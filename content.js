window.addEventListener('load', enableTranslation)

function onPathChange(callback) {
  // 监听前进/后退
  window.addEventListener('popstate', () => {
    callback(window.location.pathname)
  })

  window.addEventListener('hashchange', () => {
    callback(window.location.pathname)
  })

  window.addEventListener('locationchange', () => {
    callback(window.location.pathname)
  })

  // 劫持 pushState
  const pushState = history.pushState
  history.pushState = function (...args) {
    const result = pushState.apply(this, args)
    callback(window.location.pathname)
    return result
  }

  // 劫持 replaceState
  const replaceState = history.replaceState
  history.replaceState = function (...args) {
    const result = replaceState.apply(this, args)
    callback(window.location.pathname)
    return result
  }
}

onPathChange(enableTranslation)

async function enableTranslation() {
  const mainArticle = await waitElementReady('main article[aria-label="Readme"]')
  if (!mainArticle) return console.warn('未找到 main article[aria-label="Readme"]')

  if (mainArticle.getAttribute('data-translate') === 'yes') {
    console.log('已添加翻译属性')
    return
  }

  mainArticle.setAttribute('translate', 'yes')
  mainArticle.setAttribute('data-translate', 'yes')

  mainArticle.parentElement.style.border = '1.5px dashed rgba(255, 201, 51, 0.75)'
  mainArticle.parentElement.style.boxSizing = 'border-box'
}

async function waitElementReady(selector, timeout = 3000, check) {
  let element = null
  let ivTM
  let tt
  return new Promise((resolve, reject) => {
    ivTM = setInterval(() => {
      // console.log('等待主要区域出现...')
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
