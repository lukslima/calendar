class CreateReminders < ActiveRecord::Migration[6.1]
  def change
    create_table :reminders do |t|
      t.string :title, limit: 30
      t.timestamp :scheduled_to
      t.string :color, limit: 7

      t.timestamps
    end
  end
end
