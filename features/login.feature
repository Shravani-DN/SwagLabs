Feature: Swag Labs Demo App Login Functionality check

  Scenario Outline: Login with valid username and password
    Given I am on the login page
    When I login with <username> and <password>
    Then I should see a dashboard with text

    Examples:
      | username   | password       |
      | valid_user | valid_password |

  Scenario Outline: Login with invalid username
    Given I am on the login page
    When I login with <username> and <password>
    Then I should see a flash message saying <message>

    Examples:
      | username     | password       | message                                                      |
      | invalid_user | valid_password | Username and password do not match any user in this service. |

  Scenario Outline: Login with invalid password
    Given I am on the login page
    When I login with <username> and <password>
    Then I should see a flash message saying <message>

    Examples:
      | username   | password         | message                            |
      | valid_user | invalid_password | Username and password do not match |

  Scenario Outline: Login with empty fields
    Given I am on the login page
    When I login with empty <userName> and empty <passWord>
    Then I should see a flash message saying <message>

    Examples:
      | userName | passWord     | message              |
      |          |              | Username is required |
      | tomsmith |              | Password is required |
      |          | secret_sauce | Username is required |

  Scenario: Login with locked out user
    Given I am on the login page
    When I login with <username> and <password>
    Then I should see a flash message saying <message>

    Examples:
      | username    | password       | message                               |
      | locked_user | valid_password | Sorry, this user has been locked out. |
