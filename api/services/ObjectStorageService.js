const qiniu = require('qiniu')

const accessKey = sails.config.objectStorage.accessKey
const secretKey = sails.config.objectStorage.secretKey
const bucket = sails.config.objectStorage.bucket

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

    const uploadToken = createUploadToken(accessKey, secretKey, bucket)
    const formUploader = createFormUploader()
    const putExtra = new qiniu.form_up.PutExtra()

    return new Promise((resolve, reject) => {
      formUploader.putFile(uploadToken, filename, localPath, putExtra,
        (respErr, respBody, respInfo) => {
          if (respErr) {
            return reject(respErr)
          }
          resolve(respBody)
      })
    })
  }
}
