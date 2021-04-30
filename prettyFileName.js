/*
 * @Author: Jeffery
 * @Date: 2021-04-30 16:12:35
 * @LastEditors: Jeffery
 * @LastEditTime: 2021-04-30 19:19:51
 * @FilePath: /test/prettyFileName.js
 */
const fs = require('fs');
const path = require('path');
const images = require('images');
const outpath ='compress/';

function compress(dir, rename = false) {
  const filepath = path.resolve(__dirname, dir);

  fs.readdir(filepath, (err, files) => {
    if(err) {
      console.warn(err)
      return
    }
    files.forEach((filename) => {
      let _path = path.resolve(filepath, filename)
      // console.log(_path)
      fs.stat(_path, (error, stat) => {
        if(error) {
          console.warn(error)
          return
        }

        if(stat.isDirectory()) {
          compress(_path, rename)
        } else {
          let newFileName = filename
          const [name, appendix] = filename.split('.')
          if(rename) {
            let random = ('' + Date.now()).substr(-3) + Math.round(Math.random() * 1000)
            newFileName = random + '.' + appendix
          }
          if(appendix === 'jpg') {
            images(_path).size(300).save(path.resolve(__dirname, outpath, newFileName), {
              quality: 50
            })
          } else {
             fs.rename(_path, path.resolve(__dirname, outpath, newFileName), (errors) => {
               console.error(errors)
             })
          }
        }
      })
    })
  })
}

compress('/Users/hewenjie/Downloads/face', true)
