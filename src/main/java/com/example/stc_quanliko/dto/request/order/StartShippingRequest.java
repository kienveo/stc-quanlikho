package com.example.stc_quanliko.dto.request.order;

import com.example.stc_quanliko.dto.request.orderdetail.ProductOrderDetailRequest;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class StartShippingRequest {
    @JsonProperty("detail_requests")
    List<ProductOrderDetailRequest> detailRequests;
}
