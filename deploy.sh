#!/bin/bash
#deploys sam based lambda

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

S3_BUCKET_CODE=codiv19-code-sam
STACK_NAME=ExtractCSVLambda

aws cloudformation package \
   --template-file $DIR/template.yaml \
   --output-template-file $DIR/output.yaml \
   --s3-bucket $S3_BUCKET_CODE \
   --force-upload

aws cloudformation deploy \
   --template-file $DIR/output.yaml \
   --stack-name $STACK_NAME \
   --capabilities CAPABILITY_IAM
