class RemoveScheduledToFromReminder < ActiveRecord::Migration[6.1]
  def change
    remove_column :reminders, :scheduled_to
  end
end
