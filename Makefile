.PHONY: all

build:
	docker build -t loilo-chatbot:latest .
up:
	docker compose up

deployfiles:
	lake output --bucket loilo-terraform-state --key chatbot/terraform.tfstate --name chatbot_service | jq . > .deploy/chatbot/service.json
	lake output --bucket loilo-terraform-state --key chatbot/terraform.tfstate --name chatbot_task-definition | jq . > .deploy/chatbot/task-definition.json
