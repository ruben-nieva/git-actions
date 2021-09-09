Update procedure for testnet
Update the service in the ECS cluster by setting the Number of tasks field to 0.

Create new Task definition revision and update the Container Definitions to the new Image ex. ghcr.io/cheqd/cheqd-node:v0.1.16

Update the service in the ECS cluster by setting the Number of tasks field to 1 and Task Definition Revision field to LATEST.

Check the deployment progress and the node status after the deployment is done

Restore Testnet from scratch
<!-- markdown-link-check-disable -->
Clone the tooling repo (https://github.com/cheqd/cheqd-tooling) and execute the terraform to create the infrastructure
<!-- markdown-link-check-enable -->
IMPORTANT: Make sure the cluster task is set to 0, no containter should be running

GOOGLE: https://google.com

After recreating the environment delete the EFS volume that was created by terraform and restore the EFS from backup

Create a new revision of the Task definition and replae the File system ID and Access point ID to point to the restored backup EFS

Change the values for the Task definition in the terraform script as well

Update the service and change the task count from 0 to 1

Check the node status THE END