require 'test_helper'

class TacticsControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

  test "should get datainsert" do
    get :datainsert
    assert_response :success
  end

end
