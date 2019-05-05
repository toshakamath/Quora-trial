const AWS = require("aws-sdk");
const fs = require("fs");
const fileType = require("file-type");
const bluebird = require("bluebird");
const multiparty = require("multiparty");
// configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: "AKIAIXOBVMK5U5Y57TPQ",
  SecretAccessKey: "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"
});
// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);
// create S3 instance
const s3 = new AWS.S3();
// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: "public-read",
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  return s3.upload(params).promise();
};
