$(document).on('turbolinks:load', function() {
  $(".row-item-js").click(newReminder);
  $(".calendar-body__reminder").click(editReminder);
  $('#reminder-form').submit(saveReminder);
  $('#remove-reminder-btn').click(removeReminder);
  $('.calendar-body__reminder-more').click(expandReminder);
  $('.calendar-body__close-expanded-reminder').click(closeExpandReminder);
}); 

const saveReminder = (e) => {
  e.preventDefault();

  const $reminderForm = $('#reminder-form');
  const data = $reminderForm.serialize();
  const reminderId = $('#reminder-id').val();
  let url = $reminderForm.prop('action');
  let type = 'POST';

  if (reminderId) {
    url += `/${reminderId}`;
    type = 'PUT';
  } 

  $.ajax({ url, data, type,
    dataType: 'json',
    success: function(data) {
      if (reminderId) {
        $(`[data-id="${reminderId}"]`).remove();
      }
      
      appendNewReminder(data);
      hideReminderModal();
    },
    error: function(_xhr, er) {
      alert("error", er);
    }
  });
};

const appendNewReminder = (reminder) => {
  const reminderElementStr = 
    `<div
      class="calendar-body__reminder"
      data-id="${reminder.id}"
      data-title="${reminder.title}"
      data-date="${reminder.date}"
      data-time="${reminder.military_time}"
      data-color="${reminder.color}"
    > 
      <div class="calendar-body__reminder-color" style="background-color: ${reminder.color}"></div>
      <span class="calendar-body__reminder-time">${reminder.formated_time}</span>
      <span class="calendar-body__reminder-title">${reminder.title}</span>
    </div>`;

  const $reminders = $(`[data-date="${reminder.date}"] .calendar-body__reminder`);
  const $reminerToAdd = $(reminderElementStr);
  const reminderToAddTime = reminder.military_time;
  let notAdded = true;

  $reminders.each((_idx, element) => {
    const $reminder = $(element);
    const reminderTime = $reminder.data('time');

    if (reminderTime > reminderToAddTime) {
      $reminder.before($reminerToAdd);
      notAdded = false;
      return;
    }
  });

  if (notAdded) {
    $(`[data-date="${reminder.date}"] .calendar-body__reminders`).append($reminerToAdd);
  }

  $reminerToAdd.click(editReminder);
};

const newReminder = ({ currentTarget }) => {
  const date = $(currentTarget).data('date');

  $('#reminder-modal-label').text('Add New');
  $('#reminder-date').val(date);
  $('#remove-reminder-btn').hide();

  showReminderModal();
};

const editReminder = ({ currentTarget }) => {
  window.event.stopPropagation();

  const id = $(currentTarget).data('id');
  const title = $(currentTarget).data('title');
  const date = $(currentTarget).data('date');
  const time = $(currentTarget).data('time');
  const color = $(currentTarget).data('color');

  $('#reminder-modal-label').text('Edit');
  $('#reminder-id').val(id);
  $('#reminder-title').val(title);
  $('#reminder-date').val(date);
  $('#reminder-time').val(time);
  $('#reminder-color').val(color);
  $('#remove-reminder-btn').show();
  
  showReminderModal();
};

const removeReminder = () => {
  const $reminderForm = $('#reminder-form');
  const reminderId = $('#reminder-id').val();
  let url = `${$reminderForm.prop('action')}/${reminderId}`;

  $.ajax({
    url,
    type: 'DELETE',
    dataType: 'json',
    success: function() {
      $(`[data-id="${reminderId}"]`).remove();
      hideReminderModal();
    },
    error: function(_xhr, er) {
      alert("error", er);
    }
  });
};

const showReminderModal = () => {
  const $modal = $('#reminder-modal');
  const reminderModal = new bootstrap.Modal($modal);

  $modal.on('hide.bs.modal', () => {
    clearReminderForm();
  });

  reminderModal.show();
};

const hideReminderModal = () => {
  $('[data-bs-dismiss="modal"]')[0].click()
};

const clearReminderForm = () => {
  $('#reminder-form').trigger('reset');
  $('#reminder-id').val('');
}

const expandReminder = ({ currentTarget }) => {
  window.event.stopPropagation();
  $(currentTarget).siblings('.calendar-body__reminders').addClass('calendar-body__reminders--expanded');
};

const closeExpandReminder = ({ currentTarget }) => {
  window.event.stopPropagation();
  $(currentTarget).parent().removeClass('calendar-body__reminders--expanded');
};