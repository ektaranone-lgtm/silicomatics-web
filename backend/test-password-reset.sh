#!/bin/bash

# Password Reset API Test Script
# Tests the complete password reset flow

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# API Base URL
BASE_URL="http://localhost:5000"

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}Password Reset Flow Test${NC}"
echo -e "${BLUE}============================================${NC}\n"

# Test user email (update this to match an existing user in your database)
TEST_EMAIL="test@example.com"

# Step 1: Request Password Reset
echo -e "${YELLOW}Step 1: Requesting password reset for ${TEST_EMAIL}${NC}"
FORGOT_PASSWORD=$(curl -s -X POST "${BASE_URL}/api/auth/forgot-password" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "'"${TEST_EMAIL}"'"
  }')

echo "Response: ${FORGOT_PASSWORD}"

if [[ $FORGOT_PASSWORD == *"success\":true"* ]]; then
    echo -e "${GREEN}✅ Password reset email request successful${NC}\n"
else
    echo -e "${RED}❌ Password reset request failed${NC}\n"
    exit 1
fi

echo -e "${YELLOW}📧 Check your backend console logs for the reset token and email content${NC}"
echo -e "${YELLOW}The console will show something like:${NC}"
echo -e "${BLUE}http://localhost:5173/reset-password?token=XXXXX${NC}\n"

# Prompt for token
echo -e "${YELLOW}Step 2: Enter the reset token from the console logs:${NC}"
read -p "Token: " RESET_TOKEN

if [ -z "$RESET_TOKEN" ]; then
    echo -e "${RED}❌ No token provided${NC}"
    exit 1
fi

# Step 3: Verify Token
echo -e "\n${YELLOW}Step 3: Verifying reset token${NC}"
VERIFY_TOKEN=$(curl -s -X GET "${BASE_URL}/api/auth/verify-reset-token/${RESET_TOKEN}")

echo "Response: ${VERIFY_TOKEN}"

if [[ $VERIFY_TOKEN == *"success\":true"* ]]; then
    echo -e "${GREEN}✅ Token is valid${NC}\n"
else
    echo -e "${RED}❌ Token verification failed${NC}\n"
    exit 1
fi

# Step 4: Reset Password
echo -e "${YELLOW}Step 4: Resetting password${NC}"
NEW_PASSWORD="NewSecurePassword123"

RESET_PASSWORD=$(curl -s -X POST "${BASE_URL}/api/auth/reset-password" \
  -H "Content-Type: application/json" \
  -d '{
    "token": "'"${RESET_TOKEN}"'",
    "password": "'"${NEW_PASSWORD}"'"
  }')

echo "Response: ${RESET_PASSWORD}"

if [[ $RESET_PASSWORD == *"success\":true"* ]] && [[ $RESET_PASSWORD == *"token"* ]]; then
    echo -e "${GREEN}✅ Password reset successful!${NC}\n"
    
    # Extract the JWT token
    TOKEN=$(echo $RESET_PASSWORD | grep -o '"token":"[^"]*' | sed 's/"token":"//')
    echo -e "${GREEN}Auth Token: ${TOKEN}${NC}\n"
    
    # Step 5: Verify new password works by logging in
    echo -e "${YELLOW}Step 5: Testing login with new password${NC}"
    LOGIN=$(curl -s -X POST "${BASE_URL}/api/auth/login" \
      -H "Content-Type: application/json" \
      -d '{
        "email": "'"${TEST_EMAIL}"'",
        "password": "'"${NEW_PASSWORD}"'"
      }')
    
    echo "Response: ${LOGIN}"
    
    if [[ $LOGIN == *"success\":true"* ]]; then
        echo -e "${GREEN}✅ Login with new password successful!${NC}\n"
    else
        echo -e "${RED}❌ Login with new password failed${NC}\n"
    fi
else
    echo -e "${RED}❌ Password reset failed${NC}\n"
    exit 1
fi

echo -e "${BLUE}============================================${NC}"
echo -e "${GREEN}✅ All password reset tests completed!${NC}"
echo -e "${BLUE}============================================${NC}\n"

echo -e "${YELLOW}Summary:${NC}"
echo -e "  Email: ${TEST_EMAIL}"
echo -e "  New Password: ${NEW_PASSWORD}"
echo -e "  Status: ${GREEN}Password successfully reset${NC}"
echo -e "\n${YELLOW}Note: The token can only be used once. Run this script again to test another reset.${NC}\n"
