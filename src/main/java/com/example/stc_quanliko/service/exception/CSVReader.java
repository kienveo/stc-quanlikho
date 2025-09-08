package com.example.stc_quanliko.service.exception;

import java.io.InputStreamReader;

public class CSVReader implements AutoCloseable {
    public CSVReader(InputStreamReader inputStreamReader) {
    }

    @Override
    public void close() throws Exception {

    }

    public String[] readNext() {
        return null;
    }
}
