import { createSlice } from '@reduxjs/toolkit'

type pincodeType = {
    days: string|null
    ETD: string | null
    message: string | null
    courierpartners: pinResponseType|null
}

const initialState: pincodeType = {
    days: null,
    ETD: null,
    message: null,
    courierpartners:null
}

export const CartSlice = createSlice({
    name: 'pincode',
    initialState,
    reducers: {
        setDeliverydetails: (state, action) => {
            state.days = action.payload.days
            state.ETD = action.payload.ETD
        },
        setDeliveryMessage: (state, action) => {
            state.message = action.payload
        },
        setcourierpartners: (state, action) => {
            state.courierpartners = action.payload
        }
    },
})

export const { setDeliverydetails, setDeliveryMessage, setcourierpartners  } = CartSlice.actions

export default CartSlice.reducer

export interface Covid_zone {
    delivery_zone?: any;
    pickup_zone?: any;
}

export interface Suppression_date {
    action_on: string;
    delay_remark: string;
    delivery_delay_by: number;
    delivery_delay_days: string;
    delivery_delay_from: string;
    delivery_delay_to: string;
    pickup_delay_by: number;
    pickup_delay_days: string;
    pickup_delay_from: string;
    pickup_delay_to: string;
}

export interface Available_courier_company {
    air_max_weight: string;
    base_courier_id?: any;
    base_weight: string;
    blocked: number;
    call_before_delivery: string;
    charge_weight: number;
    city: string;
    cod: number;
    cod_charges: number;
    cod_multiplier: number;
    cost: string;
    courier_company_id: number;
    courier_name: string;
    courier_type: string;
    coverage_charges: number;
    cutoff_time: string;
    delivery_boy_contact: string;
    delivery_performance: number;
    description: string;
    edd: string;
    entry_tax: number;
    estimated_delivery_days: string;
    etd: string;
    etd_hours: number;
    freight_charge: number;
    id: number;
    is_custom_rate: number;
    is_hyperlocal: boolean;
    is_international: number;
    is_rto_address_available: boolean;
    is_surface: boolean;
    local_region: number;
    metro: number;
    min_weight: number;
    mode: number;
    odablock: boolean;
    other_charges: number;
    others?: any;
    pickup_availability: number;
    pickup_performance: number;
    pickup_priority: string;
    pickup_supress_hours: number;
    pod_available: string;
    postcode: string;
    qc_courier: number;
    rank: string;
    rate: number;
    rating: number;
    realtime_tracking: string;
    region: number;
    rto_charges: number;
    rto_performance: number;
    seconds_left_for_pickup: number;
    state: string;
    suppress_date: string;
    suppress_text: string;
    suppression_dates: Suppression_date;
    surface_max_weight: string;
    tracking_performance: number;
    volumetric_max_weight?: any;
    weight_cases: number;
}

export interface Recommended_by {
    id: number;
    title: string;
}

export interface Data {
    available_courier_companies: Available_courier_company[];
    child_courier_id?: any;
    is_recommendation_enabled: number;
    recommended_by: Recommended_by;
    recommended_courier_company_id: number;
    shiprocket_recommended_courier_id: number;
}

export interface pinResponseType {
    company_auto_shipment_insurance_setting: boolean;
    covid_zones: Covid_zone;
    currency: string;
    data: Data;
    dg_courier: number;
    eligible_for_insurance: number;
    insurace_opted_at_order_creation: boolean;
    is_allow_templatized_pricing: boolean;
    is_latlong: number;
    label_generate_type: number;
    seller_address: any[];
    status: number;
    user_insurance_manadatory: boolean;
}