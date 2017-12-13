const qiniu = require('qiniu')

const {accessKey, secretKey, bucket, domain} = sails.config.objectStorage

createCdnManager = (accessKey, secretKey) => {
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  const cdnManager = new qiniu.cdn.CdnManager(mac);
  return cdnManager
}

createUploadToken = (accessKey, secretKey, bucket) => {
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
  const putPolicy = new qiniu.rs.PutPolicy({ scope: bucket })
  return putPolicy.uploadToken(mac)
}

createFormUploader = () => {
  const config = new qiniu.conf.Config()
  config.zone = qiniu.zone.Zone_z0
  return new qiniu.form_up.FormUploader(config)
}

module.exports = {
  upload: (filename, localPath) => {

    const uploadToken = createUploadToken(accessKey, secretKey, `${bucket}:${filename}`)
    const formUploader = createFormUploader()
    const putExtra = new qiniu.form_up.PutExtra()

    return new Promise((resolve, reject) => {
      formUploader.putFile(uploadToken, filename, localPath, putExtra,
        (respErr, respBody, respInfo) => {
          if (respErr) {
            sails.log.error('OSS upload error', respErr)
            return reject(respErr)
          }
          resolve(respBody)
      })
    })
  },

  refreshCdn: (filename) => {
    const cdnManager = createCdnManager(accessKey, secretKey)
    var urlsToRefresh = [
      `${domain}/${filename}`,
      `${domain}/${filename}?imageView2/1/w/50/h/50`,
      `${domain}/${filename}?imageView2/1/w/180/h/180`
    ]
    cdnManager.refreshUrls(urlsToRefresh, (err, respBody, respInfo) => {
      if (err) {
        sails.log.error('refreshCdn upload error', err)
      }
    })
  }
}
