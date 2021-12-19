module Api::V1
  class RemindersController < Api::V1::BaseController
    before_action :set_reminder, only: [:edit, :update, :destroy]

    def edit
      json_response(@reminder)
    end

    def create
      @reminder = Reminder.create!(reminder_params)
      json_response(@reminder, :created)
    end

    def update
      @reminder.update(reminder_params)
      json_response(@reminder, :ok)
    end

    def destroy
      @reminder.destroy
      head :no_content
    end

    private

    def set_reminder
      @reminder = Reminder.find(params[:id])
    end

    def reminder_params
      params.permit(:id, :title, :date, :time, :color)
    end
  end
end
