# https-demo

### 配置sourceTree跳过登录界面
##### 位置
- 打开我的电脑
- 输入 %LocalAppData%\Atlassian\SourceTree\
- 创建文件 accounts.json
- 写入代码
```javascript
[
  {
    "$id": "1",
    "$type": "SourceTree.Api.Host.Identity.Model.IdentityAccount, SourceTree.Api.Host.Identity",
    "Authenticate": true,
    "HostInstance": {
      "$id": "2",
      "$type": "SourceTree.Host.Atlassianaccount.AtlassianAccountInstance, SourceTree.Host.AtlassianAccount",
      "Host": {
        "$id": "3",
        "$type": "SourceTree.Host.Atlassianaccount.AtlassianAccountHost, SourceTree.Host.AtlassianAccount",
        "Id": "atlassian account"
      },
      "BaseUrl": "https://id.atlassian.com/"
    },
    "Credentials": {
      "$id": "4",
      "$type": "SourceTree.Model.BasicAuthCredentials, SourceTree.Api.Account",
      "Username": "",
      "Email": null
    },
    "IsDefault": false
  }
]

```

## openssl 手动创建证书
- 在git中就可以

## 生成私钥key文件
- openssl genrsa 1024 > ./private.pem

## 通过私钥文件生成CSR证书签名
- openssl req -new -key ./private.pem -out csr.pem
- 这个地方还要输入一些配置信息 类似 npm init

## 通过私钥文件和CSR证书签名生成证书文件
- openssl x509 -req -days 365 -in csr.pem -signkey ./private.pem -out ./file.crt

## 生成了3个文件
- private.pem: 私钥
- csr.pem: CSR证书签名
- file.crt: 证书文件

## 示例代码
```javascript
var app = require('express')();
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('/path/to/private.pem', 'utf8');
var certificate = fs.readFileSync('/path/to/file.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
var PORT = 18080;
var SSLPORT = 18081;

httpServer.listen(PORT, function() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
httpsServer.listen(SSLPORT, function() {
    console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});

// Welcome
app.get('/', function(req, res) {
    if(req.protocol === 'https') {
        res.status(200).send('Welcome to Safety Land!');
    }
    else {
        res.status(200).send('Welcome!');
    }
});

```

## 备注
- 由于我们证书是自己创建的，没有经过第三方机构的验证，所以会出现警告的提示。

## openssl 命令
- req    产生证书签发申请命令
- -days  有效天数
- -req   表示证书输入请求。
- x509  签发X.509格式证书命令。
- -in   输入文件
- genrsa 产生RSA密钥命令
- 这里的参数1024，指RSA密钥长度位数，默认长度为512位这里的参数2048，指RSA密钥长度位数，默认长度为512位
- -new         表示新请求。
- -key         密钥
