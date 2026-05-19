# AWS Console Setup Process

This document serves as a step-by-step log of the AWS console actions taken to set up the necessary IAM resources for deploying a multi-stage single-container application (React + Express) using ECR and ECS.

## Step-by-Step IAM Configuration

### 1. Account Creation

* **Action:** Created an AWS account and completed the signup process.
* **Console Link:** [console.aws.amazon.com](https://console.aws.amazon.com)
* **Context Note:** This is the foundation for all AWS services. Ensure MFA (Multi-Factor Authentication) is enabled for the root account to prevent unauthorized access.

### 2. Navigating to IAM Service

* **Action:** Accessed the **IAM (Identity and Access Management)** service.
* **Methods:**
* Used the top search bar to search for "IAM".
* Services Menu > View All Services > Security, Identity, & Compliance > IAM.


* **Context Note:** IAM is the central hub for managing users, roles, and permissions across your entire AWS infrastructure.

### 3. Accessing IAM Users

* **Action:** Navigated to the **Access Management** section in the left sidebar and clicked **IAM users**.
* **Context Note:** Using individual IAM users instead of the root account follows the principle of least privilege, enhancing security.

### 4. Initiating User Creation

* **Action:** Clicked the **Create user** button.
* **Context Note:** This starts the workflow for defining a new identity that will be used for deployment tasks.

### 5. Defining Username

* **Action:** Entered the administrative username: `cohort`.
* **Context Note:** Choosing a consistent and descriptive username helps in tracking which user is responsible for specific project actions.

### 6. Permissions Configuration

* **Action:** Selected the **Attach policies directly** option.
* **Context Note:** This method allows you to explicitly choose which managed policies (pre-defined sets of permissions) to grant to this specific user.

### 7. Attaching Required Policies

* **Action:** Searched for and selected the following two managed policies:
* `AmazonEC2ContainerRegistryFullAccess`: Essential for pushing Docker images to the Elastic Container Registry (ECR).
* `AmazonECS_FullAccess`: Required to create, manage, and deploy tasks and services in the Elastic Container Service (ECS).


* **Finalization:** Clicked **Next** and then **Create user** to finalize.
* **Context Note:** These specific policies provide the user with the power to manage the full lifecycle of your containerized application on AWS.

### 8. Accessing Security Credentials

* **Action:** Opened the `cohort` user profile and navigated to the **Security credentials** tab (located below the user summary).
* **Context Note:** Security credentials are the "keys" that allow external tools (like your local terminal or CI/CD) to interact with AWS as this user.

### 9. Generating CLI Access Keys

* **Action:** Clicked **Create access key**.
* **Selection:** Chose **Command Line Interface (CLI)** as the use case and checked the required confirmation checkbox.
* **Context Note:** This generates a pair of keys specifically designed for use with the AWS CLI, enabling programmatic deployment from your development environment.

### 10. Securing Your Credentials

* **Action:** Stored the **Access Key ID** and **Secret Access Key** in a secure, permanent location.
* **Warning:** These credentials will **not be visible again** after leaving the page. If lost, you will need to deactivate these and generate a new pair.
* **Context Note:** Treat these keys like your master password. Never commit them to version control (like GitHub).

### 11. Installing AWS CLI

* **Action:** Downloaded and installed the AWS Command Line Interface (CLI) for Windows.
* **Download Link:** [AWSCLIV2.msi](https://awscli.amazonaws.com/AWSCLIV2.msi)
* **Context Note:** The AWS CLI is a unified tool that allows you to manage your AWS services from the terminal. It is required to authenticate your local environment using the access keys generated in the previous steps.

## Terminal Setup & AWS Configuration

### 12. Installing Warp Terminal

* **Action:** Downloaded and installed the Warp terminal, a modern, AI-powered terminal designed for productivity.
* **Download Link:** [warp.dev](https://www.warp.dev/)
* **Context Note:** Warp provides a more intuitive interface for running terminal commands, which is especially helpful when managing complex cloud deployments.

### 13. Configuring AWS Credentials in Warp

* **Step 1: Verify CLI Installation**
* Open Warp and run `aws --version` to ensure the AWS CLI is correctly installed and accessible.


* **Step 2: Run Configuration Command**
* Execute `aws configure` in the terminal.


* **Step 3: Input Security Credentials**
* When prompted, provide the following details (refer back to Step 10):
* **AWS Access Key ID**: Paste your `Access Key ID`.
* **AWS Secret Access Key**: Paste your `Secret Access Key`.
* **Default region name**: e.g., `us-east-1` (choose the region where your ECS cluster will reside).
* **Default output format**: `json` (recommended for readability).




* **Step 4: Validate Configuration**
* Run a test command to confirm successful setup:
```bash
aws s3 ls

```


* *Note: Even if you have no S3 buckets, a successful command (returning an empty list or a list of buckets) confirms your credentials are valid. An "Access Denied" or "Invalid Token" error indicates a configuration issue.*


* **Context Note:** This step bridges your local development environment with your AWS account, allowing you to push Docker images to ECR and manage ECS services directly from Warp.

## ECR Docker Image Build & Push Process

### 14. Accessing Elastic Container Registry (ECR)

* **Action:** Navigated back to the AWS Console home page, clicked **View all services**, located the **Containers** category, and selected **Elastic Container Registry**.

### 15. Creating an ECR Repository

* **Action:** Clicked **Create repository**, entered `cohort-demo` as the repository name, and clicked **Create**.
* **Context Note:** This repository will serve as the storage location for your application's Docker images.

### 16. Retrieving ECR Push Commands

* **Action:** Opened the `cohort-demo` repository and clicked on **View push commands**.
* **Context Note:** Selected the macOS/Linux commands as they are generally compatible with advanced terminal environments like Warp or Git Bash.

### 17. Navigating to the Project Directory

* **Action:** Opened the Warp terminal and used the `cd <folder path>` command to navigate to the root directory of the application's source code.

### 18. Authenticating Docker with AWS ECR

* **Action:** Copied the authentication command provided by AWS and ran it in the Warp terminal. Waited for the "Login Succeeded" confirmation message.
* **Command Used:** `aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 045861054204.dkr.ecr.ap-south-1.amazonaws.com`

### 19. Building a Cross-Architecture Docker Image

* **Action:** Executed a Docker build command specifically targeting a Linux environment.
* **Command Used:** `docker buildx build --platform linux/amd64 -t cohort-demo:latest . --load`
* **Context Note:** Different computers use different hardware architectures (e.g., Apple Silicon Macs use ARM, while AWS servers generally use Intel/AMD x86_64). The `buildx` tool forcefully creates a cross-architecture image compatible with AWS. The `--load` flag ensures the built image is stored in your local Docker engine.

### 20. Tagging the Docker Image

* **Action:** Ran the tag command to link the locally built image to the remote ECR repository URI.
* **Command Used:** `docker tag cohort-demo:latest 045861054204.dkr.ecr.ap-south-1.amazonaws.com/cohort-demo:latest`

### 21. Pushing the Image to ECR

* **Action:** Executed the push command to upload the tagged image to the AWS ECR repository.
* **Command Used:** `docker push 045861054204.dkr.ecr.ap-south-1.amazonaws.com/cohort-demo:latest`
* **Context Note:** At this point, the ECR process is complete and the Docker image is securely stored in AWS. The next phase involves setting up Elastic Container Service (ECS). *Tip: Always open a new tab/window for the AWS console when exploring different pages to avoid losing your progress.*

## ECS Infrastructure & Deployment Setup

### 22. Accessing the VPC Dashboard

* **Action:** Navigated to the AWS Console homepage, clicked **View all services**, located the **Networking & Content Delivery** category, and selected **VPC**.

### 23. Creating a Virtual Private Cloud (VPC)

* **Action:** Clicked **Create VPC**. Under VPC settings, selected the **VPC and more** option to automate the creation of subnets and routing tables. Entered `cohort-vpc` for the Name tag and clicked **Create VPC**.
* **Context Note:** Clicked **View VPC** after processing to confirm the network architecture was successfully created.

### 24. Accessing ECS Clusters

* **Action:** Returned to the AWS Console homepage, clicked **View all services**, selected **Elastic Container Service** under **Containers**, and clicked on **Clusters** in the left sidebar.

### 25. Creating an ECS Cluster

* **Action:** Clicked **Create cluster**, entered `cohort-cluster2` as the cluster name, selected **AWS Fargate (serverless)** in the infrastructure section, and clicked **Create**.
* **Context Note:** Renamed the cluster to "cohort-cluster2" due to an error on the first attempt. Fargate allows you to run containers without having to manage the underlying EC2 server instances.

### 26. Initiating Task Definition Creation

* **Action:** After the cluster was successfully created, navigated to **Task definitions** in the sidebar and clicked **Create new task definition**.
* **Context Note:** A Task Definition acts as a blueprint that tells ECS which Docker image to run and how much hardware to allocate to it.

### 27. Configuring Basic Task Details

* **Action:** Entered `cohort-task` as the Family name. Selected **1 vCPU** and **3 GB RAM** for the Task size based on the application's hardware requirements. Paused on this page to set up IAM roles first.

### 28. Creating an IAM Role for ECS Tasks

* **Action:** Opened a new AWS Console tab, navigated to **IAM**, clicked on **Roles** in the left panel, and clicked **Create role**. Searched for and selected **Elastic Container Service** as the use case, then clicked **Next**.

### 29. Naming the ECS Role

* **Action:** Clicked **Next** on the permissions screen, entered `cohort-task-role` as the Role name, and clicked **Create role**.

### 30. Assigning the ECS Roles to the Task

* **Action:** Returned to the Task Definition tab. In the **Task role** and **Task execution role** dropdowns, selected the newly created `cohort-task-role`.
* **Context Note (Understanding ECS Roles):** - **Task Role:** Gives the *running application code* permissions. Think of it as "What your code is allowed to do on AWS" (e.g., if your app needs permission to save user files into an S3 bucket).
* **Task Execution Role:** Gives the *AWS infrastructure* permissions. Think of it as "What ECS is allowed to do behind the scenes to get your app running" (e.g., permission to pull your Docker image from ECR and send terminal logs to CloudWatch).



### 31. Configuring Container Details

* **Action:** Scrolled to the Container section, entered `cohort-demo-server` as the container name, and ensured **Essential** was set to **Yes**.

### 32. Linking the ECR Image

* **Action:** Clicked **Browse ECR image** in the Image URI field. Selected the private repository `cohort-demo`, chose the `latest` image tag under "Select image by image tag", and clicked **Select image**.

### 33. Configuring Port Mappings and Finalizing Task

* **Action:** In the Port mappings section, set the Container port to `3000` and entered `express-server` as the Port name. Clicked the final **Create** button to finalize the task definition.

### 34. Initiating ECS Service Creation

* **Action:** Clicked on **Clusters** in the sidebar, opened `cohort-cluster2`, navigated to the **Services** tab located below the cluster details, and clicked **Create**.

### 35. Configuring Service Deployment & Networking

* **Action:** - Selected `cohort-task` under the Task definition family.
* Set **Desired tasks** to `2`.
* In the Networking panel, selected the newly created `cohort-vpc`.
* Under subnets, removed the private subnets, keeping only the 2 public subnets.
* Maintained the default selected Security Group.


* **Context Note:** A Security Group acts as a virtual firewall, defining what network traffic can enter or leave your containers. By default, it allows all outbound traffic but restricts incoming traffic.

### 36. Setting up the Application Load Balancer

* **Action:** Scrolled down to the Load balancing section, selected the **Application Load Balancer** option, and entered `cohort-ALB` for the Load balancer name. In the Target group settings, entered `cohort-TG` as the target name. Clicked the final **Create** button.
* **Context Note:** The creation process takes about 2-3 minutes to provision the load balancer and start the containers.

### 37. Retrieving the Load Balancer DNS

* **Action:** Opened the newly created service. Clicked the **Logs** tab to ensure containers were starting. Navigated to the **Configuration and networking** tab, located the DNS name under the Network configuration panel, and copied it.
* **Context Note:** Pasting this DNS name into a browser immediately will result in a timeout because the security group has not yet been configured to allow incoming web traffic on port 3000.

### 38. Updating Security Group Rules

* **Action:** Clicked on the security group link located near the DNS name. In the new Security Group page, clicked **Edit inbound rules**. Added a new rule with the following configuration:
* **Type:** Custom TCP
* **Port Range:** 3000
* **Source:** Anywhere-IPv4 (`0.0.0.0/0`)


* **Finalization:** Clicked **Save rules**.

### 39. Testing the Deployment

* **Action:** Pasted the copied DNS URL (with the port `3000` if necessary depending on the ALB routing) into the browser to verify the application is successfully routing traffic.
* **Context Note:** If it fails, check the load balancer listener configuration and target group health status in the EC2 dashboard.

### 40. Linking a Custom Domain to the Load Balancer

* **Action:** Logged into the domain registrar's DNS settings (e.g., Squarespace). Created a new DNS record with the following details:
* **Type:** CNAME
* **Name/Host:** www
* **TTL:** 30 min (or default)
* **Data/Alias/Value:** Pasted the AWS Load Balancer DNS URL.


* **Context Note:** Saved the record. Once the DNS changes propagate globally, navigating to the custom domain will successfully display the live application being hosted on ECS.

---

*Last Updated: 2026-05-16*