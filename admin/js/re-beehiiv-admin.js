(function ($) {
  "use strict";

  /**
   * All of the code for your admin-facing JavaScript source
   * should reside in this file.
   *
   * Note: It has been assumed you will write jQuery code here, so the
   * $ function reference has been prepared for usage within the scope
   * of this function.
   *
   * This enables you to define handlers, for when the DOM is ready:
   *
   * $(function() {
   *
   * });
   *
   * When the window is loaded:
   *
   * $( window ).load(function() {
   *
   * });
   *
   * ...and/or other possibilities.
   *
   * Ideally, it is not considered best practise to attach more than a
   * single DOM-ready or window-load handler for a particular page.
   * Although scripts in the WordPress core, Plugins and Themes may be
   * practising this, we should strive to set a better example in our own work.
   */


  jQuery(document).ready(function ($) {

    $('#re-beehiiv-auto-import').on('click', function () {
        
        if (!check_required_fields()) {
          return false;
        }
  
        $(this).hide();
        $('.re-beehiiv-import-running').show();
        re_beehiiv_start_auto_import();
        location.reload();
    })

    $('#re-beehiiv-post_type').on('change', function() {
      let post_type = $(this).val();

      if (post_type == null || post_type == undefined || post_type == '' || post_type == '0') {
        $('#re-beehiiv-taxonomy').html('<option value="0">Select taxonomy</option>');
        $('#re-beehiiv-taxonomy_term').html('<option value="0">Select taxonomy term</option>');
        $('#re-beehiiv-taxonomy').addClass('hidden');
        $('#re-beehiiv-taxonomy_term').addClass('hidden');
        return false;
      }

      let taxonomies = AllTaxonomies[post_type];

      // if taxomies is empty
      if (taxonomies == null || taxonomies == '') {
        // hide the taxonomy and taxonomy term select
        $('#re-beehiiv-taxonomy').addClass('hidden');
        $('#re-beehiiv-taxonomy_term').addClass('hidden');
        return false;
      }

      // show the taxonomy select
      $('#re-beehiiv-taxonomy').removeClass('hidden');

      // populate the taxonomy select
      let html = '<option value="0">Select taxonomy</option>';

      for (let i = 0; i < taxonomies.length; i++) {
        html += '<option value="' + taxonomies[i].name + '">' + taxonomies[i].label + '</option>';
      }

      $('#re-beehiiv-taxonomy').html(html);
    });

    $('#re-beehiiv-taxonomy').on('change', function() {
      let taxonomy = $(this).val();

      if (taxonomy == null || taxonomy == undefined || taxonomy == '' || taxonomy == '0') {
        $('#re-beehiiv-taxonomy_term').html('<option value="0">Select taxonomy term</option>');
        $('#re-beehiiv-taxonomy_term').addClass('hidden');
        return false;
      }
      let taxonomies = AllTaxonomies[$('#re-beehiiv-post_type').val()];

      if (taxonomies == null || taxonomies == '') {
        // hide the taxonomy and taxonomy term select
        $('#re-beehiiv-taxonomy').addClass('hidden');
        $('#re-beehiiv-taxonomy_term').addClass('hidden');
        return false;
      }

      // show the taxonomy select
      $('#re-beehiiv-taxonomy_term').removeClass('hidden');

      // populate the taxonomy select
      let html = '<option value="0">Select taxonomy term</option>';

      UpdateTaxonomyTerms();
    });

    $('#re-beehiiv-import-form').on('submit', function (e) {
      e.preventDefault();

      if (!check_required_fields()) {
        return false;
      }
      
      // If all required fields are filled, form will be submitted
      this.submit();
    });

    // .re-beehiiv-import-fields--step is selector of accordion
    $('.re-beehiiv-import-fields--step--title').on('click', function () {
      // hide all accordion content
      $('.re-beehiiv-import-fields--step-content').hide();
      // remove active class from all accordion
      $('.re-beehiiv-import-fields--step').removeClass('active');
      // add active class to current accordion
      $(this).parent().addClass('active');
      // show current accordion content
      $(this).next().show();
    });
  });
})(jQuery);

function UpdateTaxonomyTerms() {
  jQuery('#re-beehiiv-taxonomy_term').html('<option value="0">Select taxonomy term</option>');

  let post_type = jQuery('#re-beehiiv-post_type').val();
  let taxonomy = jQuery('#re-beehiiv-taxonomy').val();

  if (post_type == null || post_type == undefined || post_type == '' || post_type == '0' || taxonomy == null || taxonomy == undefined || taxonomy == '' || taxonomy == '0') {
    return false;
  }

  let Terms = AllTaxonomyTerms[post_type][taxonomy];

  if (Terms == null || Terms == undefined || Terms == '') {
    return false;
  }

  let html = '<option value="0">Select taxonomy term</option>';

  for (let i = 0; i < Terms.length; i++) {
    html += '<option value="' + Terms[i].term_id + '">' + Terms[i].name + '</option>';
  }

  jQuery('#re-beehiiv-taxonomy_term').html(html);

  return true;
}

function check_required_fields() {
  $list_of_required_fields = [
    {
      id: 're-beehiiv-content_type[]',
      name: 'Content type',
      type: 'checkbox'
    },
    {
      id: 're-beehiiv-beehiiv-status[]',
      name: 'Post status on Beehiiv',
      type: 'checkbox'
    },
    {
      id: 're-beehiiv-post_type',
      name: 'Post type',
      type: 'select'
    },
    {
      id: 're-beehiiv-taxonomy',
      name: 'Taxonomy',
      type: 'select'
    },
    {
      id: 're-beehiiv-taxonomy_term',
      name: 'Taxonomy term',
      type: 'select'
    },
    {
      id: 're-beehiiv-post_author',
      name: 'Post Author',
      type: 'select'
    },
    {
      id: 're-beehiiv-import_method',
      name: 'Import method',
      type: 'radio'
    },
    {
      id: 're-beehiiv-post_status',
      name: 'Post status',
      type: 'radio'
    },
    {
      id: 're-beehiiv-import_interval',
      name: 'Import interval',
      type: 'select'
    },
  ];

  $notice_list = jQuery('#re-beehiiv-import--notices');
  $has_error = false;
  $notice_list.find('ul').html('');

  $list_of_required_fields.forEach(function (field) {
    if (!validateInput(field.id, field.type)) {
      $has_error = true;
      $notice_list.find('ul').append('<li>' + field.name + ' is a required field</li>');
    }
  });

  if ($has_error) {
    $notice_list.children('.re-beehiiv-import--notice-error').removeClass('hidden');

    jQuery('html, body').animate({
      scrollTop: $notice_list.offset().top - 100
    }, 500);

    return false;
  } else {
    $notice_list.children('.re-beehiiv-import--notice-error').addClass('hidden');
  }

  return true;
}

function validateInput( $input_name, $input_type ) {
  switch ($input_type) {
    case 'select':
      let $input = jQuery(`#${$input_name}`);
      $input_value = $input.val();
      if ($input_value == null || $input_value == undefined || $input_value == '' || $input_value == '0') {
        return false;
      }
      break;
    case 'radio':
    case 'checkbox':
      $input_value = jQuery(`input[name='${$input_name}']:checked`).val()
      if (!$input_value) {
        return false;
      }
      break;
    default:
      $input = jQuery(`#${$input_name}`);
      $input_value = $input.val();
      if ($input_value == null || $input_value == undefined || $input_value == '') {
        return false;
      }
      break;
  }

  return true;
}