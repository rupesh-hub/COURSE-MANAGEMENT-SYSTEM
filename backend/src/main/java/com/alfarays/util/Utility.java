package com.alfarays.util;

public final class Utility {

    private Utility() {
    }

    public static String capitalize(String value) {
        if (value == null || value.isEmpty()) return value;
        return String.format("%s%s", Character.toUpperCase(value.charAt(0)), value.substring(1));
    }


}
