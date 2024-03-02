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
- Go back to Settings and update the "Default root object" to "/container/latest/index.html"
- Go to Error Pages (redirect 403 to homepage)
  - HTTP error code: 403:hidden
  - Customize error response: Yes
  - Response page path: /container/latest/index.html
  - HTTP Response code: 200: OK

# AWS IAM
- Add a new user "udemy-github-action"
- Permissions - attach policies directly to all my S3 and cloudfront *** danger
- Wait and then create access key for CLI
- Copy the "Access key ID", "Secret access key" to github -> Settings -> "Actions secrets and variables"
- Add new "Secret Key": AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET_NAME