module Api::V1
  class BaseController < ActionController::API
    include Api::Concerns::Response
    include Api::Concerns::ExceptionHandler
  end
end
