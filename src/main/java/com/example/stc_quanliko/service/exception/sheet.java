package com.example.stc_quanliko.service.exception;

import java.util.Iterator;
import java.util.List;

public abstract class sheet implements Iterable<Row> {
    private List<Row> rows;

    @Override
    public Iterator<Row> iterator(){
        return (Iterator<Row>) rows;
    }
}
