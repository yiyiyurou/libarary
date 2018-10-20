import config from '../../config'

const staticPath = process.env.NODE_ENV !== 'development' ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory
/**
 *  更换主题皮肤
 *  @param {String}   -皮肤资源
 */
export const changeTheme = function (themeAssets) {
  if (!themeAssets || typeof themeAssets !== 'string') return
  // 需要移到单独的文件存放
  let itemPath = staticPath + '/theme/' + themeAssets + '?t=' + Math.random()
  loadCss(itemPath)

  // 为头部插入CSS
  function loadCss (path) {
    var head = document.getElementsByTagName('head')[0]
    var link = document.createElement('link')
    link.id = 'themeAsset'
    link.href = path
    link.rel = 'stylesheet'
    link.type = 'text/css'

    if (document.getElementById('themeAsset')) document.getElementById('themeAsset').remove()

    head.appendChild(link)
  }
}
