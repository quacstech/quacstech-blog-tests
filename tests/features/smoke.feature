Feature: Smoke test — critical path for the quacs.tech blog

  @smoke
  Scenario: Homepage loads successfully
    When a visitor navigates to the homepage
    Then the page responds successfully
    And the site title is visible
    And the primary navigation is visible

  @smoke
  Scenario: Visitor can open a blog post from the homepage
    Given the visitor is on the homepage
    When they open the first listed post
    Then the post page loads successfully
    And the post title is visible
    And the post content is visible

  @smoke
  Scenario: Primary navigation reaches the blog's key sections
    Given the visitor is on the homepage
    Then the primary navigation includes a link to the posts index
    And the primary navigation includes a link to the AI digest page

  @smoke
  Scenario: Site renders fully without a broken page
    When a visitor navigates to the homepage
    Then no server error or blank page is shown
    And the footer is visible, confirming the full page rendered
