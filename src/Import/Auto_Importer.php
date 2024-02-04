<?php // phpcs:ignore Squiz.Commenting.FileComment.Missing

namespace WP_to_Beehiiv_Integration\Import;
use WP_to_Beehiiv_Integration\Import\Interfaces\Importer;
use WP_to_Beehiiv_Integration\Import\Manage_Actions;
use WP_to_Beehiiv_Integration\Import\Queue;
use WP_to_Beehiiv_Integration\API\V2\Posts;

defined( 'ABSPATH' ) || exit;

class Auto_Importer extends Importer {

    protected $items = array();

    /**
     * Importer constructor.
     *
     * @param array $form_data
     * @param string $group_name
     * @param string $method
     */
    public function __construct($form_data, $group_name, $method) {
        $this->form_data = $form_data;
        $this->group_name = $group_name;
        $this->method = $method;

        $this->queue = new Queue();
    }
    
    public function import() {
        if ( $this->group_name === 're_import_batch' ) {
            $this->get_all_data();
        } else {
            $this->add_recurrence_task();
        }
    }

    protected function add_recurrence_task() {
        // Remove old actions
        Manage_Actions::remove_auto_actions();

		foreach ( $this->form_data as $account_key=>$account ) {

            $req['group'] = $this->group_name;
            $req['args']  = array(
                'auto' => 'auto',
            );
            $req['args']  = array_merge( $req['args'],$account );
            // Add action
		    $this->queue->add_recurrence_task( $req );  
		}
    }

    protected function get_all_data() {
        $this->get_data_method = 'full';
        $this->import_method   = 'at_once';

        $this->get_data_from_beehiiv();
        $this->items = $this->prepare_data_for_saving_to_custom_table( $this->items );
        $this->save_items_to_custom_table( $this->items );
        $this->maybe_push_to_queue( $this->items );
    }

    protected function get_data_from_beehiiv() {
        
        $data = Posts::get_all_posts( 'free_web_content', $this->form_data );

        $this->items = $data;

        return true;
    }
}