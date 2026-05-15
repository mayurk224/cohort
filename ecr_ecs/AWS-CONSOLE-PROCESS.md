# AWS Console Setup Process

This document serves as a step-by-step log of the AWS console actions taken to set up the necessary IAM resources for deploying a multi-stage single-container application (React + Express) using ECR and ECS.

## Step-by-Step IAM Configuration

### 1. Account Creation
- **Action:** Created an AWS account and completed the signup process.
- **Console Link:** [console.aws.amazon.com](https://console.aws.amazon.com)
- **Context Note:** This is the foundation for all AWS services. Ensure MFA (Multi-Factor Authentication) is enabled for the root account to prevent unauthorized access.

### 2. Navigating to IAM Service
- **Action:** Accessed the **IAM (Identity and Access Management)** service.
- **Methods:**
  - Used the top search bar to search for "IAM".
  - Services Menu > View All Services > Security, Identity, & Compliance > IAM.
- **Context Note:** IAM is the central hub for managing users, roles, and permissions across your entire AWS infrastructure.

### 3. Accessing IAM Users
- **Action:** Navigated to the **Access Management** section in the left sidebar and clicked **IAM users**.
- **Context Note:** Using individual IAM users instead of the root account follows the principle of least privilege, enhancing security.

### 4. Initiating User Creation
- **Action:** Clicked the **Create user** button.
- **Context Note:** This starts the workflow for defining a new identity that will be used for deployment tasks.

### 5. Defining Username
- **Action:** Entered the administrative username: `cohort`.
- **Context Note:** Choosing a consistent and descriptive username helps in tracking which user is responsible for specific project actions.

### 6. Permissions Configuration
- **Action:** Selected the **Attach policies directly** option.
- **Context Note:** This method allows you to explicitly choose which managed policies (pre-defined sets of permissions) to grant to this specific user.

### 7. Attaching Required Policies
- **Action:** Searched for and selected the following two managed policies:
  - `AmazonEC2ContainerRegistryFullAccess`: Essential for pushing Docker images to the Elastic Container Registry (ECR).
  - `AmazonECS_FullAccess`: Required to create, manage, and deploy tasks and services in the Elastic Container Service (ECS).
- **Finalization:** Clicked **Next** and then **Create user** to finalize.
- **Context Note:** These specific policies provide the user with the power to manage the full lifecycle of your containerized application on AWS.

### 8. Accessing Security Credentials
- **Action:** Opened the `cohort` user profile and navigated to the **Security credentials** tab (located below the user summary).
- **Context Note:** Security credentials are the "keys" that allow external tools (like your local terminal or CI/CD) to interact with AWS as this user.

### 9. Generating CLI Access Keys
- **Action:** Clicked **Create access key**.
- **Selection:** Chose **Command Line Interface (CLI)** as the use case and checked the required confirmation checkbox.
- **Context Note:** This generates a pair of keys specifically designed for use with the AWS CLI, enabling programmatic deployment from your development environment.

### 10. Securing Your Credentials
- **Action:** Stored the **Access Key ID** and **Secret Access Key** in a secure, permanent location.
- **Warning:** These credentials will **not be visible again** after leaving the page. If lost, you will need to deactivate these and generate a new pair.
- **Context Note:** Treat these keys like your master password. Never commit them to version control (like GitHub).

---
*Last Updated: 2026-05-15*
