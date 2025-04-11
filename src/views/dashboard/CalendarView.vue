<script setup lang="ts">
import Navigation from '@/components/dashboard/Navigation.vue';
import { ref, computed, onMounted } from 'vue';
import AddEventCalendarDialog from '@/components/dashboard/dialogs/calendar/AddEventCalendarDialog.vue';

// Calendar State
const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());

// Events State
interface CalendarEvent {
  id: string;
  title: string;
  details: string;
  date: Date;
}

const events = ref<CalendarEvent[]>([
  {
    id: 'sample-event',
    title: 'Demo Event',
    details: 'This is a sample event',
    date: new Date(),
  }
]);

// Dialog State
const selectedDate = ref<Date | null>(null);

// Calendar navigation
const goToPreviousMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
};

const goToNextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
};

const goToToday = () => {
  const today = new Date();
  currentMonth.value = today.getMonth();
  currentYear.value = today.getFullYear();
};

// Format a date for display
const formatDate = (date: Date | null): string => {
  if (!date) return '';
  return date.toLocaleDateString();
};

// Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
const getFirstDayOfMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value, 1).getDay();
});

// Get the number of days in the month
const getDaysInMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
});

// Get the current month name
const currentMonthName = computed(() => {
  return new Date(currentYear.value, currentMonth.value).toLocaleString('default', { month: 'long' });
});

// Generate calendar days with proper offset for the first day of month
const calendarDays = computed(() => {
  const days = [];
  const firstDay = getFirstDayOfMonth.value;
  const daysInMonth = getDaysInMonth.value;
  
  // Previous month padding days (empty cells)
  for (let i = 0; i < firstDay; i++) {
    days.push({ day: null, isCurrentMonth: false });
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ 
      day: i, 
      isCurrentMonth: true,
      date: new Date(currentYear.value, currentMonth.value, i),
      events: getEventsForDay(i)
    });
  }
  
  // Ensure we have a complete grid (6 rows x 7 days)
  const totalCells = 42;
  if (days.length < totalCells) {
    const remainingDays = totalCells - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ day: i, isCurrentMonth: false });
    }
  }
  
  return days;
});

// Get events for a specific day
function getEventsForDay(day: number) {
  return events.value.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getDate() === day && 
           eventDate.getMonth() === currentMonth.value && 
           eventDate.getFullYear() === currentYear.value;
  });
}

// Handle date clicks - no longer needed since we use dialog directly
const onDateClick = (date: Date) => {
  console.log('Calendar date click:', date);
  selectedDate.value = date;
};

// Add a new event - triggered by AddEventCalendarDialog
const addEvent = (newEvent: CalendarEvent) => {
  console.log('Adding new event:', newEvent);
  events.value = [...events.value, newEvent];
  console.log('Updated events:', events.value);
};

// Update an existing event
const updateEvent = (updatedEvent: CalendarEvent) => {
  console.log('Updating event:', updatedEvent);
  
  const index = events.value.findIndex(event => event.id === updatedEvent.id);
  
  if (index !== -1) {
    // Replace the event at the found index
    const updatedEvents = [...events.value];
    updatedEvents[index] = updatedEvent;
    events.value = updatedEvents;
    console.log('Updated events array after edit:', events.value);
  } else {
    // If not found (unlikely), add as new
    events.value = [...events.value, updatedEvent];
  }
};

// Check if a date is today
const isToday = (date: Date) => {
  const today = new Date();
  return date.getDate() === today.getDate() && 
         date.getMonth() === today.getMonth() && 
         date.getFullYear() === today.getFullYear();
};

// Set initial sample event to today
onMounted(() => {
  const today = new Date();
  events.value[0].date = today;
  console.log('Initial events:', events.value);
});
</script>

<template>
  <Navigation>
    <div class="p-6 bg-gray-100 min-h-screen">
      <h1 class="text-2xl font-bold mb-6 text-gray-800">Calendar</h1>

      <!-- Calendar container -->
      <div class="rounded-lg shadow bg-white p-4">
        <!-- Calendar navigation -->
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">
            {{ currentMonthName }} {{ currentYear }}
          </h2>
          <div class="flex space-x-2">
            <button 
              @click="goToPreviousMonth"
              class="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              &laquo; Previous
            </button>
            <button 
              @click="goToToday"
              class="p-2 bg-blue-100 rounded-md hover:bg-blue-200"
            >
              Today
            </button>
            <button 
              @click="goToNextMonth"
              class="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Next &raquo;
            </button>
          </div>
        </div>

        <!-- Calendar grid -->
        <div class="grid grid-cols-7 text-center">
          <!-- Day headers -->
          <div class="py-2 font-semibold border-b border-gray-200">Sun</div>
          <div class="py-2 font-semibold border-b border-gray-200">Mon</div>
          <div class="py-2 font-semibold border-b border-gray-200">Tue</div>
          <div class="py-2 font-semibold border-b border-gray-200">Wed</div>
          <div class="py-2 font-semibold border-b border-gray-200">Thu</div>
          <div class="py-2 font-semibold border-b border-gray-200">Fri</div>
          <div class="py-2 font-semibold border-b border-gray-200">Sat</div>
          
          <!-- Calendar cells -->
          <div 
            v-for="(day, index) in calendarDays" 
            :key="index" 
            :class="[
              'calendar-day border border-gray-200 relative min-h-[100px]',
              day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
              day.date && isToday(day.date) ? 'today' : '',
              !day.isCurrentMonth ? 'pointer-events-none' : ''
            ]"
          >
            <!-- Make the entire cell clickable using the dialog -->
            <AddEventCalendarDialog 
              v-if="day.isCurrentMonth && day.date"
              :date="day.date ? formatDate(day.date) : ''"
              @add-event="addEvent"
            >
              <template #triggerbutton>
                <!-- Invisible button that covers the entire cell -->
                <button class="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
                </button>
              </template>
            </AddEventCalendarDialog>

            <!-- Day number -->
            <div 
              :class="[
                'absolute top-1 right-2 h-6 w-6 flex items-center justify-center',
                day.date && isToday(day.date) ? 'bg-blue-500 text-white rounded-full' : ''
              ]"
            >
              {{ day.day }}
            </div>
            
            <!-- Events -->
            <div class="mt-8 mx-1">
              <div v-for="event in day.events" :key="event.id">
                <AddEventCalendarDialog 
                  :date="day.date ? formatDate(day.date) : ''"
                  :existing-event="event"
                  @add-event="updateEvent"
                >
                  <template #triggerbutton>
                    <div class="event-card p-1 mb-1 text-left text-xs rounded cursor-pointer z-10 relative">
                      <div class="font-semibold">{{ event.title }}</div>
                      <div v-if="event.details" class="text-xs">{{ event.details }}</div>
                    </div>
                  </template>
                </AddEventCalendarDialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Navigation>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}

.calendar-day {
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.calendar-day:hover {
  background-color: #f3f4f6;
}

.today {
  background-color: #eff6ff !important;
}

.event-card {
  background-color: #3b82f6;
  color: white;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  word-break: break-word;
  overflow: hidden;
  transition: transform 0.1s ease;
}

.event-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
