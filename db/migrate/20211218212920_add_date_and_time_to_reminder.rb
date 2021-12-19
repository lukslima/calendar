class AddDateAndTimeToReminder < ActiveRecord::Migration[6.1]
  def change
    add_column :reminders, :date, :date
    add_column :reminders, :time, :time
  end
end
