// Used to translate <select> options into data that can be stored
function make_array_from_selected_options(select_element) {
  return Array.from(select_element.selectedOptions).map(v=>v.value)
}

// Selects the options within the provided <select>
// Takes the array object directly from sync storage
function select_options_from_settings_array(select_element, settings_array) {
  Array.from(select_element.options).forEach(function(option_element) {
    if (settings_array.includes(option_element.value)) {
      option_element.selected = 'selected';
    }
  });
}

// Saves options to chrome.storage
function save_options() {
  var domain_osint_sources = make_array_from_selected_options(document.getElementById('domain_osint_sources'));
  var ip_osint_sources = make_array_from_selected_options(document.getElementById('ip_osint_sources'));
  var filehash_osint_sources = make_array_from_selected_options(document.getElementById('filehash_osint_sources'));

  chrome.storage.sync.set({
    domain_osint_sources: domain_osint_sources,
    ip_osint_sources: ip_osint_sources,
    filehash_osint_sources: filehash_osint_sources
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Settings saved successfuly.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Default options should be "all sources selected"
  chrome.storage.sync.get({
    domain_osint_sources: ['virustotal', 'talosintelligence', 'ibmxforce', 'shodan'],
    ip_osint_sources: ['virustotal', 'talosintelligence', 'ibmxforce', 'ipinfo', 'abuseipdb', 'greynoise', 'shodan'],
    filehash_osint_sources: ['virustotal', 'talosintelligence', 'ibmxforce', 'hybridanalysis'],
  }, function(items) {
    select_options_from_settings_array(document.getElementById('domain_osint_sources'), items.domain_osint_sources);
    select_options_from_settings_array(document.getElementById('ip_osint_sources'), items.ip_osint_sources);
    select_options_from_settings_array(document.getElementById('filehash_osint_sources'), items.filehash_osint_sources);
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
