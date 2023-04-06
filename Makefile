.PHONY: all
deployfiles:
	lake output --bucket loilo-terraform-state --key chatbot/terraform.tfstate --name chatbot_service | jq . > .deploy/chatbot/service.json
	lake output --bucket loilo-terraform-state --key chatbot/terraform.tfstate --name chatbot_task-definition | jq . > .deploy/chatbot/task-definition.json
