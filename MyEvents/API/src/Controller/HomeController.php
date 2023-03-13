<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class HomeController extends AbstractController
{
    private $client;

    public function __construct(HttpClientInterface $client){

        $this->client = $client;
    }

     /**
     * @Route("/home", name="home", methods={"GET", "POST"})
     */
    public function getEventByGeolocation(Request $request): Response
    {
        $parameters = json_decode($request->getContent(), true);
        $latitude = $parameters['latitude'];
        $longitude = $parameters['longitude'];  
        $response = $this->client->request(
            
            'GET', 
            'https://public.opendatasoft.com/api/records/1.0/search/?dataset=evenements-publics-cibul&q=&facet=tags&facet=placename&facet=department&facet=region&facet=city&facet=date_start&facet=date_end&facet=pricing_info&facet=updated_at&facet=city_district&geofilter.distance=' . $latitude . '%2C+' . $longitude . '%2C+1000',
            // these values are automatically encoded before including them in the URL    
        );
        
        return new Response($response->getContent());
    }

    /**
    * @Route("/api/filter", name="api_filter", methods={"GET", "POST"})
    */
    public function filter(Request $request): Response
    {
        $parameters = json_decode($request->getContent(), true);

        $categorie = $parameters['categorie'];
        $lieu = ucfirst($parameters['lieu']);
        
        if($categorie !== null && $lieu == null){
            $response = $this->client->request(
                
                'GET', 
                'https://public.opendatasoft.com/api/records/1.0/search/?dataset=evenements-publics-cibul&q=&facet=tags&facet=placename&facet=department&facet=region&facet=city&facet=date_start&facet=date_end&facet=pricing_info&facet=updated_at&facet=city_district&refine.tags=' . $categorie,
                // 'https://api.openagenda.com/v2/agendas?key=API_KEY&search=paris'
                // these values are automatically encoded before including them in the URL    
            );
        
            return new Response($response->getContent());
        }

        elseif($lieu !== null && $categorie == null){
            $response = $this->client->request(
                
                'GET', 
                'https://public.opendatasoft.com/api/records/1.0/search/?dataset=evenements-publics-cibul&q=&facet=tags&facet=placename&facet=department&facet=region&facet=city&facet=date_start&facet=date_end&facet=pricing_info&facet=updated_at&facet=city_district&refine.city=' . $lieu,
                // 'https://api.openagenda.com/v2/agendas?key=API_KEY&search=paris'
                // these values are automatically encoded before including them in the URL    
            );
        
            return new Response($response->getContent());
        }

        elseif($categorie !== null && $lieu !== null){
            $response = $this->client->request(
                
                'GET', 
                'https://public.opendatasoft.com/api/records/1.0/search/?dataset=evenements-publics-cibul&q=&facet=tags&facet=placename&facet=department&facet=region&facet=city&facet=date_start&facet=date_end&facet=pricing_info&facet=updated_at&facet=city_district&refine.tags=' . $categorie . '&refine.city=' . $lieu,
                // 'https://api.openagenda.com/v2/agendas?key=API_KEY&search=paris'
                // these values are automatically encoded before including them in the URL    
            );
        
            return new Response($response->getContent());
        }
    }

        /**
    * @Route("/event_details", name="events_details", methods={"GET", "POST"})
    */
    public function evntsDetails(Request $request): Response
    {
        $parameters = json_decode($request->getContent(), true);

        $event_id = $parameters['event_id'];
        
        if($event_id !== null){
            $response = $this->client->request(
                
                'GET', 
                'https://public.opendatasoft.com/api/records/1.0/search/?dataset=evenements-publics-cibul&q=&facet=tags&facet=placename&facet=department&facet=region&facet=city&facet=date_start&facet=date_end&facet=pricing_info&facet=updated_at&facet=city_district&refine.uid=' . $event_id,
                // 'https://api.openagenda.com/v2/agendas?key=API_KEY&search=paris'
                // these values are automatically encoded before including them in the URL    
            );
        
            return new Response($response->getContent());
        }
    }
}
