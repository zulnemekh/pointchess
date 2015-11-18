require 'test_helper'

class TournamentControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

  test "should get battle" do
    get :battle
    assert_response :success
  end

end
