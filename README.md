Video: https://www.udemy.com/course/microfrontend-course/learn/lecture/23206942

This projects contains 4 modules
- Container - React
- Marketing - React
- Auth - React
- Dashboard - Vue

# To Run
```bash
- npm run start
```


# Git Action for CI/CD
- set up deployment yml files


# AWS S3 
Create a new bucket "udemy-microfrontends-with-react-dashboard"
- Go to Setting and enable static website hosting
- Go to Permission and disable all "Block public access"
- Set up Bucket Policy:
```
{
  "Id": "Policy1709390508700",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1709390493018",
      "Action": [
        "s3:GetObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::udemy-microfrontends-with-react-dashboard/*",
      "Principal": "*"
    }
  ]
}
```


# AWS Cloudfront
- Create a new distribution and pulling the files from our S3 bucket
- Set Origin Domain to udemy-microfrontends-with-react-dashboard.s3-website-us-east-1.amazonaws.com
- Redirect HTTP to HTTPS
- Wait until distribution is deployed
- Go back to Settings and update the "Default root object" to "container/latest/index.html"
- Go to Error Pages (redirect 403 to homepage)
  - HTTP error code: 403:hidden
  - Customize error response: Yes
  - Response page path: /container/latest/index.html
  - HTTP Response code: 200: OK


# AWS IAM
- Add a new user "udemy-github-action"
- Permissions - attach policies directly with "AmazonS3FullAccess" and "CloudFrontFullAccess" *** danger
- Wait and then create access key for CLI
- Copy the "Access key ID", "Secret access key" to github -> Settings -> "Actions secrets and variables"
- Add new "Secret Key": AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET_NAME
- Also add Cloudfront domain name to Git secrets "PRODUCTION_DOMAIN" such as "https://d287sijgv3wsh.cloudfront.net"


# Action -> Cloudfront (Manual way)
- Cloudfront caches the changes
- After running any git actions, you need to manually run Invalidations in Cloudfront for the index.html since the filename never get changes. All the other js files already built with new hash so no need to invalidate them.
- just invalidate the index file: /container/latest/index.html
# (Automatically way)
- Add the create-invalidation in the deployment yml file


# Routing/Navigation
- Modules use memory history and need to sync back to Container
- 1. Handling communication from Container down to submodules
- 2. Handling communication from submodules back to Container