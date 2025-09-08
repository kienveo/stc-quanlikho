package com.example.stc_quanliko.dto.request.order;

import com.example.stc_quanliko.dto.request.orderdetail.ProductOrderDetailRequest;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
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
public class ProductOrderUpdateRequest {

    @NotBlank(message = "Product order id not blank")
    @JsonProperty("product_order_id")
    private String productOrderId;

    @NotBlank(message = "Status is not blank")
    @JsonProperty("status")
    private String status;

    @JsonProperty("product_order_details")
    private List<ProductOrderDetailRequest> productOrderDetails;
}
