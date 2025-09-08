package com.example.stc_quanliko.service.report.data;


import com.example.stc_quanliko.constant.Constant;
import org.apache.commons.lang3.StringUtils;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RestockProductCategoryReportData {
    String productName = StringUtils.EMPTY;
    String productCategory = StringUtils.EMPTY;
    String inStock = StringUtils.EMPTY;
    String quantityToOrder = StringUtils.EMPTY;

    public String toRow() {
        return productName + Constant.COMMA +
                productCategory + Constant.COMMA +
                inStock + Constant.COMMA +
                quantityToOrder +
                Constant.NEW_LINE;
    }
}

