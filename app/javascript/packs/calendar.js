$(document).on('turbolinks:load', function() {
  $(".row-item-js").click(newReminder);
  $(".calendar-body__reminder").click(editReminder);
  $('#reminder-form').submit(saveReminder);
  $('#remove-reminder-btn').click(deleteReminder);
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
        removeReminderFromList(reminderId);
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

  const $remindersContainer = $(`[data-date="${reminder.date}"] .calendar-body__reminders`);

  if (notAdded) {
    $remindersContainer.append($reminerToAdd);
  }

  $reminerToAdd.click(editReminder);
  updateReminderMore($remindersContainer);
};

const removeReminderFromList = (reminderId) => {
  const $reminder = $(`[data-id="${reminderId}"]`);
  const $reminderContainer = $reminder.parent();

  $reminder.remove();
  updateReminderMore($reminderContainer);
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

const deleteReminder = () => {
  const $reminderForm = $('#reminder-form');
  const reminderId = $('#reminder-id').val();
  let url = `${$reminderForm.prop('action')}/${reminderId}`;

  $.ajax({
    url,
    type: 'DELETE',
    dataType: 'json',
    success: function() {
      removeReminderFromList(reminderId);
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

const updateReminderMore = ($remindersContainer) => {
  const $reminders = $remindersContainer.find('.calendar-body__reminder');
  const rowsCount = $('.calendar-body__row').length;
  const remindersCount = $reminders.length;
  const remindersLimit = rowsCount == 5 ? 3 : 2;
  const visibleClass = 'calendar-body__reminder-more--visible';
  const $reminderMore = $remindersContainer.siblings('.calendar-body__reminder-more');

  if (remindersCount > remindersLimit) {
    const remindersMoreNumber = remindersCount - remindersLimit; 

    $reminderMore.addClass(visibleClass);
    $reminderMore.find('.calendar-body__reminder-more-number').text(remindersMoreNumber);
  } else {
    $reminderMore.removeClass(visibleClass);
    $reminderMore.find('.calendar-body__reminder-more-number').text('');
  }
};